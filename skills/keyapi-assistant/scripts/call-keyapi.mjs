import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const defaultBaseUrl = "https://api.keyapi.ai";
const defaultTimeoutMs = 30000;
const defaultMaxStdoutBytes = 100000;
const defaultPreviewItems = 5;
const minNodeMajor = 18;
const managedBlockStart = "# >>> keyapi-skills >>>";
const managedBlockEnd = "# <<< keyapi-skills <<<";
const tokenFile = path.join(os.homedir(), ".config", "keyapi", "token");
const valueArgKeys = new Set([
  "path",
  "method",
  "query",
  "query-file",
  "query-param",
  "param",
  "body",
  "body-file",
  "image-file",
  "image-field",
  "timeout-ms",
  "max-stdout-bytes",
  "preview-items",
  "stdout",
  "output-file"
]);

function requireSupportedNodeVersion() {
  const major = Number(process.versions.node.split(".")[0]);
  if (!Number.isInteger(major) || major < minNodeMajor) {
    throw new Error(`Node.js >= ${minNodeMajor} is required. Current version: ${process.versions.node}`);
  }
}

function parseArgs(argv) {
  const args = {
    method: "GET",
    queryParams: [],
    timeoutMs: defaultTimeoutMs,
    maxStdoutBytes: defaultMaxStdoutBytes,
    previewItems: defaultPreviewItems,
    stdout: "auto"
  };

  for (let index = 2; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      throw new Error(`Unexpected argument: ${token}`);
    }

    const equalsIndex = token.indexOf("=");
    const rawKey = equalsIndex === -1 ? token : token.slice(0, equalsIndex);
    const inlineValue = equalsIndex === -1 ? undefined : token.slice(equalsIndex + 1);
    const key = rawKey.slice(2);
    if (!valueArgKeys.has(key)) {
      throw new Error(`Unsupported argument: --${key}`);
    }

    const value = inlineValue ?? argv[index + 1];
    if (value === undefined || value === "" || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    if (inlineValue === undefined) index += 1;

    if (key === "path") args.path = value;
    else if (key === "method") args.method = value.toUpperCase();
    else if (key === "query") args.query = value;
    else if (key === "query-file") args.queryFile = value;
    else if (key === "query-param" || key === "param") args.queryParams.push(value);
    else if (key === "body") args.body = value;
    else if (key === "body-file") args.bodyFile = value;
    else if (key === "image-file") args.imageFile = value;
    else if (key === "image-field") args.imageField = value;
    else if (key === "timeout-ms") args.timeoutMs = Number(value);
    else if (key === "max-stdout-bytes") args.maxStdoutBytes = Number(value);
    else if (key === "preview-items") args.previewItems = Number(value);
    else if (key === "stdout") args.stdout = value;
    else if (key === "output-file") args.outputFile = value;
  }

  if (!args.path) throw new Error("Missing required argument: --path");
  if (!args.path.startsWith("/v1/")) {
    throw new Error("--path must be a complete KeyAPI path starting with /v1/.");
  }
  if (!Number.isFinite(args.timeoutMs) || args.timeoutMs < 0) {
    throw new Error("--timeout-ms must be a non-negative number.");
  }
  if (!Number.isInteger(args.maxStdoutBytes) || args.maxStdoutBytes < 0) {
    throw new Error("--max-stdout-bytes must be a non-negative integer.");
  }
  if (!Number.isInteger(args.previewItems) || args.previewItems < 0) {
    throw new Error("--preview-items must be a non-negative integer.");
  }
  if (!["auto", "full", "preview", "none"].includes(args.stdout)) {
    throw new Error("--stdout must be one of: auto, full, preview, none.");
  }
  return args;
}

function isPlaceholder(value) {
  return !value || new Set([
    "your_token",
    "your_token_here",
    "your_keyapi_token",
    "keyapi_token",
    "changeme",
    "replace_me",
    "todo"
  ]).has(String(value).trim().toLowerCase());
}

function detectProfilePath() {
  if (process.platform === "win32") return undefined;
  const home = os.homedir();
  const shell = process.env.SHELL || "";
  if (shell.includes("zsh")) return path.join(home, ".zshrc");
  if (shell.includes("bash")) {
    const bashrc = path.join(home, ".bashrc");
    return existsSync(bashrc) ? bashrc : path.join(home, ".bash_profile");
  }
  return path.join(home, ".profile");
}

function extractManagedBlock(contents) {
  const start = contents.indexOf(managedBlockStart);
  if (start === -1) return undefined;
  const end = contents.indexOf(managedBlockEnd, start + managedBlockStart.length);
  if (end === -1) return undefined;
  return contents.slice(start + managedBlockStart.length, end);
}

function parseManagedValue(rawValue) {
  const value = rawValue.trim();
  if (value.startsWith("'") && value.endsWith("'")) {
    const inner = value.slice(1, -1);
    return inner.split("'\\''").join("'");
  }
  if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
  return value;
}

async function readTokenFromManagedProfile() {
  const profilePath = detectProfilePath();
  if (!profilePath) return undefined;
  if (!existsSync(profilePath)) return undefined;
  const block = extractManagedBlock(await readFile(profilePath, "utf8"));
  if (!block) return undefined;
  const posix = block.match(/^\s*export\s+KEYAPI_TOKEN=(.+?)\s*$/m);
  const rawValue = posix?.[1];
  if (!rawValue) return undefined;
  const token = parseManagedValue(rawValue).trim();
  return isPlaceholder(token) ? undefined : token;
}

async function readTokenFromCredentialFile() {
  if (!existsSync(tokenFile)) return undefined;
  const token = (await readFile(tokenFile, "utf8")).trim();
  return isPlaceholder(token) ? undefined : token;
}

async function buildAuthHeader() {
  if (!isPlaceholder(process.env.KEYAPI_TOKEN)) {
    return `Bearer ${String(process.env.KEYAPI_TOKEN).trim()}`;
  }
  const savedToken = await readTokenFromCredentialFile();
  if (!isPlaceholder(savedToken)) return `Bearer ${savedToken}`;
  const profileToken = await readTokenFromManagedProfile();
  if (!isPlaceholder(profileToken)) return `Bearer ${profileToken}`;
  throw new Error(
    "KEYAPI_TOKEN is unavailable. Run node scripts/setup-keyapi.mjs. If you just configured it, restart your agent or terminal, then retry."
  );
}

function parseJson(label, value) {
  if (!value) return undefined;
  try {
    return JSON.parse(String(value).replace(/^\uFEFF/, ""));
  } catch (error) {
    throw new Error(`Invalid JSON for ${label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function parseQueryObject(label, value) {
  const parsed = parseJson(label, value);
  if (parsed === undefined) return {};
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${label} must be a JSON object.`);
  }
  return parsed;
}

function parseQueryParam(value) {
  const separator = String(value).indexOf("=");
  if (separator <= 0) throw new Error("--query-param must use key=value.");
  const key = String(value).slice(0, separator).trim();
  if (!key) throw new Error("--query-param key cannot be empty.");
  return [key, String(value).slice(separator + 1)];
}

async function loadQuery(args) {
  const query = {};
  if (args.query) Object.assign(query, parseQueryObject("--query", args.query));
  if (args.queryFile) {
    Object.assign(query, parseQueryObject("--query-file", await readFile(args.queryFile, "utf8")));
  }
  for (const entry of args.queryParams) {
    const [key, value] = parseQueryParam(entry);
    if (value !== "") query[key] = value;
  }
  return Object.keys(query).length ? query : undefined;
}

function appendQuery(url, query) {
  if (!query) return;
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) url.searchParams.set(key, value.join(","));
    else if (typeof value === "object") url.searchParams.set(key, JSON.stringify(value));
    else url.searchParams.set(key, String(value));
  }
}

async function loadBody(args) {
  if (args.body && args.bodyFile) throw new Error("Use either --body or --body-file, not both.");
  let body = args.bodyFile
    ? parseJson("--body-file", await readFile(args.bodyFile, "utf8"))
    : parseJson("--body", args.body);

  if (args.imageFile) {
    if (body === undefined) body = {};
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new Error("--image-file can only be merged into a JSON object body.");
    }
    const field = args.imageField || "image_base64";
    body[field] = (await readFile(args.imageFile)).toString("base64");
  }

  const field = args.imageField || "image_base64";
  if (body && typeof body === "object" && !Array.isArray(body) && typeof body[field] === "string") {
    body[field] = body[field].replace(/^data:[^,]*;base64,/, "");
  }
  return body;
}

function platformFromPath(requestPath) {
  return requestPath.split("/")[2];
}

function hasEnvelopeFailure(value) {
  return Boolean(
    value && typeof value === "object" && !Array.isArray(value) &&
    typeof value.code === "number" && value.code !== 0
  );
}

function previewValue(value, maxItems, depth = 0) {
  if (depth >= 5) return summarizeScalar(value);
  if (Array.isArray(value)) {
    const preview = value.slice(0, maxItems).map((item) => previewValue(item, maxItems, depth + 1));
    if (value.length > maxItems) preview.push({ truncated: value.length - maxItems });
    return preview;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    const preview = {};
    for (const [key, item] of entries.slice(0, 30)) {
      preview[key] = previewValue(item, maxItems, depth + 1);
    }
    if (entries.length > 30) preview.__truncatedKeys = entries.length - 30;
    return preview;
  }
  return summarizeScalar(value);
}

function summarizeScalar(value) {
  if (typeof value === "string" && value.length > 500) {
    return `${value.slice(0, 500)}... [truncated ${value.length - 500} chars]`;
  }
  return value;
}

async function writeResult(result, outputFile) {
  const outputPath = path.resolve(outputFile);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  return outputPath;
}

async function emitSuccess(result, args) {
  const fullText = JSON.stringify(result, null, 2);
  const fullResultBytes = Buffer.byteLength(fullText, "utf8");
  const savedTo = args.outputFile ? await writeResult(result, args.outputFile) : undefined;
  if (args.stdout === "none") return;

  if (
    args.stdout === "full" ||
    (args.stdout === "auto" && fullResultBytes <= args.maxStdoutBytes && !savedTo)
  ) {
    process.stdout.write(`${fullText}\n`);
    return;
  }

  const envelope = result.data && typeof result.data === "object" && !Array.isArray(result.data)
    ? result.data
    : undefined;
  const summary = {
    ok: result.ok,
    status: result.status,
    code: typeof envelope?.code === "number" ? envelope.code : undefined,
    message: typeof envelope?.message === "string" ? envelope.message : undefined,
    url: result.url,
    method: result.method,
    platform: result.platform,
    savedTo,
    fullResultBytes,
    stdoutMode: savedTo ? "preview-with-saved-result" : "preview",
    note: savedTo
      ? "Full JSON was written to --output-file."
      : "Full JSON omitted from stdout. Re-run with --output-file <path> to save the complete response.",
    preview: previewValue(result.data, args.previewItems)
  };
  if (!savedTo) delete summary.savedTo;
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

async function main() {
  requireSupportedNodeVersion();
  const args = parseArgs(process.argv);
  const query = await loadQuery(args);
  const body = await loadBody(args);
  const authHeader = await buildAuthHeader();
  const url = new URL(args.path, process.env.KEYAPI_BASE_URL || defaultBaseUrl);
  appendQuery(url, query);

  const headers = { Accept: "application/json", Authorization: authHeader };
  const options = {
    method: args.method,
    headers,
    signal: args.timeoutMs > 0 ? AbortSignal.timeout(args.timeoutMs) : undefined
  };
  if (body !== undefined && args.method !== "GET") {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  const result = {
    ok: response.ok,
    status: response.status,
    url: url.toString(),
    method: args.method,
    platform: platformFromPath(args.path),
    data
  };

  if (!response.ok || hasEnvelopeFailure(data)) {
    process.stderr.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exitCode = 1;
    return;
  }
  await emitSuccess(result, args);
}

try {
  await main();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
