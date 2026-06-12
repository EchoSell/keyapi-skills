import process from "node:process";

const platform = "reddit";
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

    const [rawKey, inlineValue] = token.split("=", 2);
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
    else if (key === "base-url") args.baseUrl = nextValue;
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
    return JSON.parse(value);
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

async function main() {
  requireSupportedNodeVersion();
  const args = parseArgs(process.argv);
  const requestPath = resolvePath(args);
  const baseUrl = args.baseUrl || process.env.KEYAPI_API_BASE_URL || defaultBaseUrl;
  const authHeader = buildAuthHeader();
  const query = parseJsonFlag("--query", args.query);
  const body = parseJsonFlag("--body", args.body);

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

  if (!response.ok) {
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
