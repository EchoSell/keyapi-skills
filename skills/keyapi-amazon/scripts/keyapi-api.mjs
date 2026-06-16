import { readFile } from "node:fs/promises";
import process from "node:process";

const platform = "amazon";
const defaultBaseUrl = "https://api.keyapi.ai";
const defaultTimeoutMs = 30000;
const minNodeMajor = 18;

function requireSupportedNodeVersion() {
  const major = Number(process.versions.node.split(".")[0]);
  if (Number.isNaN(major) || major < minNodeMajor) {
    throw new Error(`Node.js >= ${minNodeMajor} is required. Current version: ${process.versions.node}`);
  }
}

function parseArgs(argv) {
  const args = {
    method: "GET",
    timeoutMs: defaultTimeoutMs
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
    const nextValue = inlineValue ?? argv[index + 1];

    if (!nextValue || nextValue.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    if (inlineValue === undefined) {
      index += 1;
    }

    if (key === "path") args.path = nextValue;
    else if (key === "endpoint") args.endpoint = nextValue;
    else if (key === "method") args.method = nextValue.toUpperCase();
    else if (key === "query") args.query = nextValue;
    else if (key === "body") args.body = nextValue;
    else if (key === "body-file") args.bodyFile = nextValue;
    else if (key === "image-file") args.imageFile = nextValue;
    else if (key === "image-field") args.imageField = nextValue;
    else if (key === "timeout-ms") args.timeoutMs = Number(nextValue);
    else throw new Error(`Unsupported argument: --${key}`);
  }

  return args;
}

function isPlaceholder(value) {
  if (!value) {
    return true;
  }
  return new Set([
    "",
    "your_token",
    "your_token_here",
    "your_keyapi_token",
    "keyapi_token",
    "changeme",
    "replace_me",
    "todo"
  ]).has(String(value).trim().toLowerCase());
}

function buildAuthHeader() {
  if (!isPlaceholder(process.env.KEYAPI_TOKEN)) {
    return `Bearer ${String(process.env.KEYAPI_TOKEN).trim()}`;
  }
  throw new Error(
    "KEYAPI_TOKEN is not configured. Run node scripts/configure-keyapi-auth.mjs first, then restart Codex or Claude Code."
  );
}

function parseJsonFlag(label, value) {
  if (!value) {
    return undefined;
  }
  try {
    return JSON.parse(String(value).replace(/^\uFEFF/, ""));
  } catch (error) {
    throw new Error(`Invalid JSON for ${label}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function appendQuery(url, query) {
  if (!query || typeof query !== "object" || Array.isArray(query)) {
    return;
  }

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }
    if (Array.isArray(value)) {
      url.searchParams.set(key, value.join(","));
    } else if (typeof value === "object") {
      url.searchParams.set(key, JSON.stringify(value));
    } else {
      url.searchParams.set(key, String(value));
    }
  }
}

function resolvePath(args) {
  if (args.path && args.endpoint) {
    throw new Error("Use either --path or --endpoint, not both.");
  }
  if (args.endpoint) {
    const endpoint = args.endpoint.startsWith("/") ? args.endpoint : `/${args.endpoint}`;
    return `/v1/${platform}${endpoint}`;
  }
  if (!args.path) {
    throw new Error("Missing required argument: --path or --endpoint");
  }
  if (!args.path.startsWith("/v1/")) {
    throw new Error("--path must start with /v1/; use --endpoint for platform-relative paths.");
  }
  if (!args.path.startsWith(`/v1/${platform}/`) && args.path !== `/v1/${platform}`) {
    throw new Error(`This skill can only call /v1/${platform}/... paths. Use the matching KeyAPI platform skill for other platforms.`);
  }
  return args.path;
}

function stripDataUrlPrefix(value) {
  return typeof value === "string" ? value.replace(/^data:[^,]*;base64,/, "") : value;
}

function hasKeyApiEnvelopeFailure(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof value.code === "number" &&
      value.code !== 0
  );
}

async function loadBody(args) {
  if (args.body && args.bodyFile) {
    throw new Error("Use either --body or --body-file, not both.");
  }

  let body;
  if (args.bodyFile) {
    body = parseJsonFlag("--body-file", await readFile(args.bodyFile, "utf8"));
  } else {
    body = parseJsonFlag("--body", args.body);
  }

  if (args.imageFile) {
    const imageField = args.imageField || "image_base64";
    if (body === undefined) {
      body = {};
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new Error("--image-file can only be merged into a JSON object body.");
    }
    body[imageField] = (await readFile(args.imageFile)).toString("base64");
  }

  const imageField = args.imageField || "image_base64";
  if (body && typeof body === "object" && !Array.isArray(body) && typeof body[imageField] === "string") {
    body[imageField] = stripDataUrlPrefix(body[imageField]);
  }

  return body;
}

async function main() {
  requireSupportedNodeVersion();
  const args = parseArgs(process.argv);
  const requestPath = resolvePath(args);
  const baseUrl = defaultBaseUrl;
  const authHeader = buildAuthHeader();
  const query = parseJsonFlag("--query", args.query);
  const body = await loadBody(args);

  const url = new URL(requestPath, baseUrl);
  appendQuery(url, query);

  const headers = {
    Accept: "application/json",
    Authorization: authHeader
  };

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

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }

  const result = {
    ok: response.ok,
    status: response.status,
    url: url.toString(),
    method: args.method,
    platform,
    data: parsed
  };

  if (!response.ok || hasKeyApiEnvelopeFailure(parsed)) {
    process.stderr.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exitCode = 1;
    return;
  }

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

try {
  await main();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
