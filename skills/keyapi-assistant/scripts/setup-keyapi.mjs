#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process, { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import { spawnSync } from "node:child_process";

const MIN_NODE_MAJOR = 18;
const MANAGED_START = "# >>> keyapi-skills >>>";
const MANAGED_END = "# <<< keyapi-skills <<<";
const TOKEN_FILE = path.join(os.homedir(), ".config", "keyapi", "token");

function checkNodeVersion() {
  const major = Number(process.versions.node.split(".")[0]);
  if (!Number.isInteger(major) || major < MIN_NODE_MAJOR) {
    throw new Error(
      `Node.js >= ${MIN_NODE_MAJOR} is required. Current: ${process.versions.node}`
    );
  }
}

function parseArgs(argv) {
  const args = { status: false };

  for (let i = 2; i < argv.length; i++) {
    const part = argv[i];

    if (part === "--status") {
      args.status = true;
      continue;
    }

    if (!part.startsWith("--")) {
      throw new Error(`Unexpected argument: ${part}`);
    }

    const eq = part.indexOf("=");
    const key = (eq < 0 ? part : part.slice(0, eq)).slice(2);

    if (!["profile", "token"].includes(key)) {
      throw new Error(`Unsupported argument: --${key}`);
    }

    const value = eq < 0 ? argv[++i] : part.slice(eq + 1);

    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    if (key === "profile") {
      args.profilePath = path.resolve(value);
    } else {
      args.token = value;
    }
  }

  return args;
}

const PLACEHOLDERS = new Set([
  "your_token",
  "your_token_here",
  "your_keyapi_token",
  "your_api_key",
  "keyapi_token",
  "changeme",
  "replace_me",
  "todo",
]);

function validToken(value) {
  const token = typeof value === "string" ? value.trim() : "";

  return token !== "" && !PLACEHOLDERS.has(token.toLowerCase());
}

function requireToken(value) {
  if (!validToken(value)) {
    throw new Error("Missing or placeholder value for KEYAPI_TOKEN.");
  }

  if (/[\r\n\0]/.test(value)) {
    throw new Error("API Key must be a single line.");
  }

  return value.trim();
}

function getSavedToken() {
  if (!fs.existsSync(TOKEN_FILE)) return undefined;

  const token = fs.readFileSync(TOKEN_FILE, "utf8").trim();

  return validToken(token) ? token : undefined;
}

function getToken() {
  // 优先读取环境变量
  const envToken = process.env.KEYAPI_TOKEN;

  if (validToken(envToken)) return envToken.trim();

  // 环境变量不存在时，读取本地凭证文件
  return getSavedToken();
}

function maskToken(token) {
  const value = token.trim();
  if (value.length <= 4) return "*".repeat(value.length);
  if (value.length <= 10) {
    return `${value.slice(0, 2)}${"*".repeat(value.length - 4)}${value.slice(-2)}`;
  }
  return `${value.slice(0, 6)}${"*".repeat(value.length - 10)}${value.slice(-4)}`;
}

function printStatus() {
  const token = getToken();
  if (token) {
    console.log(`\nKeyAPI API Key configured successfully.\nAPI Key: ${maskToken(token)}\n`);
  } else {
    console.log(
      "KeyAPI API Key is not configured.\n" +
      "Run: node scripts/setup-keyapi.mjs"
    );
  }
}

// 隐藏用户输入，避免 API Key 在终端回显
async function promptHidden(question) {
  const hiddenOutput = new Writable({
    write(_chunk, _encoding, callback) {
      callback();
    },
  });

  const rl = createInterface({
    input,
    output: hiddenOutput,
    terminal: Boolean(input.isTTY),
  });

  try {
    output.write(question);
    const answer = await rl.question("");
    output.write("\n");
    return answer;
  } finally {
    rl.close();
  }
}

async function collectToken(args) {
  if (args.token !== undefined) {
    output.write(
      "Warning: --token may expose secrets in command history or process lists. Prefer interactive input.\n"
    );

    return requireToken(args.token);
  }

  output.write("Configure your KeyAPI API Key for future requests.\n");
  output.write(
    "Get your API Key (e.g., sk_live_NOj**********OYZ06y) from: https://keyapi.ai/app/dashboard\n\n"
  );

  return requireToken(
    await promptHidden("Enter your API Key (input hidden): ")
  );
}

// 统一保存到本地凭证文件
function writeTokenFile(token) {
  const dir = path.dirname(TOKEN_FILE);

  fs.mkdirSync(dir, {
    recursive: true,
    mode: 0o700,
  });

  if (process.platform !== "win32") {
    fs.chmodSync(dir, 0o700);
  }

  // 先写临时文件，再替换，避免写入过程中损坏旧配置
  const tmp = path.join(
    dir,
    `.token-${process.pid}-${Date.now()}.tmp`
  );

  try {
    fs.writeFileSync(tmp, `${token}\n`, {
      encoding: "utf8",
      mode: 0o600,
      flag: "wx",
    });

    if (process.platform !== "win32") {
      fs.chmodSync(tmp, 0o600);
    }

    fs.renameSync(tmp, TOKEN_FILE);

    if (process.platform !== "win32") {
      fs.chmodSync(TOKEN_FILE, 0o600);
    }
  } finally {
    if (fs.existsSync(tmp)) {
      fs.unlinkSync(tmp);
    }
  }
}

// Windows：设置用户级环境变量
function persistWindowsUserEnvironment(token) {
  if (process.platform !== "win32") return;

  const shell = process.env.SystemRoot
    ? path.join(
        process.env.SystemRoot,
        "System32",
        "WindowsPowerShell",
        "v1.0",
        "powershell.exe"
      )
    : "powershell.exe";

  const command =
    '[Environment]::SetEnvironmentVariable("KEYAPI_TOKEN", [Console]::In.ReadToEnd(), "User")';

  const child = spawnSync(
    shell,
    ["-NoProfile", "-NonInteractive", "-Command", command],
    {
      input: token,
      encoding: "utf8",
      windowsHide: true,
    }
  );

  if (child.error) throw child.error;

  if (child.status !== 0) {
    throw new Error(
      `Failed to save Windows user environment variable: ${(child.stderr || "").trim()}`
    );
  }
}

// macOS / Linux：识别 Shell 配置文件
function detectProfilePath(explicitPath) {
  if (explicitPath) return explicitPath;
  if (process.platform === "win32") return undefined;

  const shell = path.basename(process.env.SHELL || "").toLowerCase();

  if (shell === "zsh") {
    return path.join(os.homedir(), ".zshrc");
  }

  if (shell === "bash") {
    return path.join(os.homedir(), ".bashrc");
  }

  if (shell === "sh" || shell === "dash") {
    return path.join(os.homedir(), ".profile");
  }

  return undefined;
}

// 生成 Shell 环境变量配置块
function managedBlock(profilePath) {
  const isPowershell = profilePath.toLowerCase().endsWith(".ps1");

  const assignment = isPowershell
    ? '$keyapiTokenFile = Join-Path $HOME ".config/keyapi/token"\nif (Test-Path -LiteralPath $keyapiTokenFile) { $env:KEYAPI_TOKEN = (Get-Content -LiteralPath $keyapiTokenFile -Raw).Trim() }'
    : 'if [ -r "$HOME/.config/keyapi/token" ]; then\n  export KEYAPI_TOKEN="$(cat "$HOME/.config/keyapi/token")"\nfi';

  return `${MANAGED_START}\n${assignment}\n${MANAGED_END}\n`;
}

// 更新 Shell 配置，不重复追加
function writeProfile(profilePath) {
  const parent = path.dirname(profilePath);

  fs.mkdirSync(parent, { recursive: true });

  const current = fs.existsSync(profilePath)
    ? fs.readFileSync(profilePath, "utf8")
    : "";

  const starts = current.split(MANAGED_START).length - 1;
  const ends = current.split(MANAGED_END).length - 1;

  if (starts !== ends) {
    throw new Error(
      `Incomplete KeyAPI block in ${profilePath}; please repair it manually.`
    );
  }

  const escapedStart = MANAGED_START.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const escapedEnd = MANAGED_END.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const pattern = new RegExp(
    `${escapedStart}[\\s\\S]*?${escapedEnd}\\r?\\n?`,
    "g"
  );

  const content = current.replace(pattern, "").trimEnd();

  fs.writeFileSync(
    profilePath,
    `${content ? content + "\n\n" : ""}${managedBlock(profilePath)}`,
    "utf8"
  );
}

async function main() {
  checkNodeVersion();

  const args = parseArgs(process.argv);

  if (args.status) {
    return printStatus();
  }

  const token = await collectToken(args);

  // 所有系统都保存到统一凭证文件
  writeTokenFile(token);

  // 仅当前 Node.js 进程立即生效
  process.env.KEYAPI_TOKEN = token;

  // Windows 持久化到用户环境变量
  if (process.platform === "win32" && !args.profilePath) {
    persistWindowsUserEnvironment(token);
  }

  // macOS / Linux 配置 Shell
  const profile = detectProfilePath(args.profilePath);

  if (profile) {
    writeProfile(profile);
  }

  printStatus();
  output.write(`Saved in: ${TOKEN_FILE}\n`);

  if (profile) {
    output.write(`Shell profile updated: ${profile}\n`);
  }

  output.write(
    "Run --status to verify. Restart your terminal/AI client if it needs an updated environment variable.\n"
  );
}

try {
  await main();
} catch (error) {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`
  );

  process.exitCode = 1;
}
