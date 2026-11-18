import process from "node:process";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const defaultBaseUrl = "https://www.keyapi.ai";
const defaultLimit = 10;
const defaultOffset = 0;
const minNodeMajor = 18;
const valueArgs = new Set(["platform", "limit", "offset", "endpoint-path"]);
const httpMethods = ["get", "post", "put", "patch", "delete", "options", "head"];
const execFileAsync = promisify(execFile);

function requireSupportedNodeVersion() {
  const major = Number(process.versions.node.split(".")[0]);
  if (!Number.isInteger(major) || major < minNodeMajor) {
    throw new Error(`Node.js >= ${minNodeMajor} is required. Current version: ${process.versions.node}`);
  }
}

function parseArgs(argv) {
  const args = {
    listPlatforms: false,
    limit: defaultLimit,
    offset: defaultOffset
  };

  for (let index = 2; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--list-platforms") {
      args.listPlatforms = true;
      continue;
    }
    if (!token.startsWith("--")) {
      throw new Error(`Unexpected argument: ${token}`);
    }

    const equalsIndex = token.indexOf("=");
    const rawKey = equalsIndex === -1 ? token : token.slice(0, equalsIndex);
    const inlineValue = equalsIndex === -1 ? undefined : token.slice(equalsIndex + 1);
    const key = rawKey.slice(2);
    if (!valueArgs.has(key)) {
      throw new Error(`Unsupported argument: --${key}`);
    }

    const value = inlineValue ?? argv[index + 1];
    if (value === undefined || value === "" || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    if (inlineValue === undefined) {
      index += 1;
    }

    if (key === "platform") args.platform = value.trim().toLowerCase();
    else if (key === "limit") args.limit = Number(value);
    else if (key === "offset") args.offset = Number(value);
    else if (key === "endpoint-path") args.endpointPath = value;
  }

  if (args.listPlatforms && args.platform) {
    throw new Error("Use either --list-platforms or --platform, not both.");
  }
  if (!args.listPlatforms && !args.platform) {
    throw new Error("Use --list-platforms or provide --platform <name>.");
  }
  if (args.endpointPath && !args.endpointPath.startsWith("/v1/")) {
    throw new Error("--endpoint-path must be a complete path starting with /v1/.");
  }
  if (!Number.isInteger(args.limit) || args.limit <= 0) {
    throw new Error("--limit must be a positive integer.");
  }
  if (!Number.isInteger(args.offset) || args.offset < 0) {
    throw new Error("--offset must be a non-negative integer.");
  }

  return args;
}

async function fetchTextWithSystemClient(url) {
  const commonOptions = {
    encoding: "utf8",
    maxBuffer: 25 * 1024 * 1024,
    timeout: 45000,
    windowsHide: true
  };
  if (process.platform === "win32") {
    const command = [
      "$ProgressPreference = 'SilentlyContinue'",
      "[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()",
      "(Invoke-WebRequest -UseBasicParsing -Uri $env:KEYAPI_DISCOVERY_FETCH_URL -TimeoutSec 30).Content"
    ].join("; ");
    const { stdout } = await execFileAsync(
      "powershell.exe",
      ["-NoProfile", "-NonInteractive", "-Command", command],
      {
        ...commonOptions,
        env: { ...process.env, KEYAPI_DISCOVERY_FETCH_URL: String(url) }
      }
    );
    return stdout.replace(/^\uFEFF/, "");
  }

  const { stdout } = await execFileAsync(
    "curl",
    ["--fail", "--silent", "--show-error", "--location", "--max-time", "30", String(url)],
    commonOptions
  );
  return stdout.replace(/^\uFEFF/, "");
}

async function fetchJson(url, { preferSystem = false } = {}) {
  if (preferSystem) {
    return JSON.parse(await fetchTextWithSystemClient(url));
  }

  let response;
  try {
    response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000)
    });
  } catch (error) {
    try {
      return JSON.parse(await fetchTextWithSystemClient(url));
    } catch {
      throw error;
    }
  }
  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`KeyAPI discovery HTTP ${response.status}: ${responseText || response.statusText}`);
  }
  try {
    return JSON.parse(responseText);
  } catch {
    throw new Error("KeyAPI discovery response was not valid JSON.");
  }
}

async function resolveOperation(args) {
  const baseUrl = process.env.KEYAPI_DISCOVERY_BASE_URL || defaultBaseUrl;
  const index = await fetchJson(new URL("/openapi/index.json", baseUrl));
  const openapiUrls = index?.[args.platform]?.openapi_urls;
  if (!Array.isArray(openapiUrls) || openapiUrls.length === 0) {
    throw new Error(`No OpenAPI documents found for platform: ${args.platform}`);
  }

  for (const openapiUrl of openapiUrls) {
    const trustedUrl = validateOpenApiUrl(openapiUrl, baseUrl);
    const document = await fetchJson(trustedUrl, {
      preferSystem: process.platform === "win32" && !process.env.KEYAPI_DISCOVERY_BASE_URL
    });
    const pathItem = document?.paths?.[args.endpointPath];
    if (!pathItem) continue;
    for (const method of httpMethods) {
      if (pathItem[method]) {
        return {
          platform: args.platform,
          path: args.endpointPath,
          method: method.toUpperCase(),
          operation: compactOperation(resolveLocalRefs(pathItem[method], document))
        };
      }
    }
  }
  throw new Error(`Endpoint path was not found for ${args.platform}: ${args.endpointPath}`);
}

function validateOpenApiUrl(value, baseUrl) {
  let candidate;
  try {
    candidate = new URL(value);
  } catch {
    throw new Error(`Untrusted OpenAPI URL: ${value}`);
  }

  const configuredBase = new URL(baseUrl);
  const customBase = Boolean(process.env.KEYAPI_DISCOVERY_BASE_URL);
  const trusted = customBase
    ? candidate.origin === configuredBase.origin && candidate.pathname.startsWith("/openapi/")
    : candidate.protocol === "https:" &&
      ["www.keyapi.ai", "keyapi.ai"].includes(candidate.hostname) &&
      candidate.pathname.startsWith("/openapi/");
  if (!trusted) throw new Error(`Untrusted OpenAPI URL: ${value}`);
  return candidate;
}

function resolveLocalRefs(value, document, resolving = new Set()) {
  if (Array.isArray(value)) {
    return value.map((item) => resolveLocalRefs(item, document, resolving));
  }
  if (!value || typeof value !== "object") return value;

  if (typeof value.$ref === "string" && value.$ref.startsWith("#/")) {
    if (resolving.has(value.$ref)) return value;
    const target = value.$ref
      .slice(2)
      .split("/")
      .map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"))
      .reduce((current, part) => current?.[part], document);
    if (target === undefined) return value;
    const nextResolving = new Set(resolving).add(value.$ref);
    const siblings = Object.fromEntries(Object.entries(value).filter(([key]) => key !== "$ref"));
    return {
      ...resolveLocalRefs(target, document, nextResolving),
      ...resolveLocalRefs(siblings, document, nextResolving)
    };
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, resolveLocalRefs(item, document, resolving)])
  );
}

function compactOperation(value) {
  if (typeof value === "string") {
    return value.length > 1000
      ? `${value.slice(0, 200)}... [truncated ${value.length - 200} chars]`
      : value;
  }
  if (Array.isArray(value)) return value.map(compactOperation);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, compactOperation(item)])
    );
  }
  return value;
}

function buildUrl(args) {
  const baseUrl = process.env.KEYAPI_DISCOVERY_BASE_URL || defaultBaseUrl;
  if (args.listPlatforms) {
    return new URL("/openapi/index.json", baseUrl);
  }

  const url = new URL("/openapi/discover_endpoints", baseUrl);
  url.searchParams.set("platform", args.platform);
  url.searchParams.set("limit", String(args.limit));
  url.searchParams.set("offset", String(args.offset));
  return url;
}

async function main() {
  requireSupportedNodeVersion();
  const args = parseArgs(process.argv);
  if (args.endpointPath) {
    process.stdout.write(`${JSON.stringify(await resolveOperation(args), null, 2)}\n`);
    return;
  }
  const url = buildUrl(args);
  const result = await fetchJson(url);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

try {
  await main();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
