#!/usr/bin/env node
/**
 * KeyAPI MCP Tool Runner
 *
 * Calls any KeyAPI MCP tool with built-in caching, auto-pagination,
 * and automatic cover-image URL conversion.
 *
 * Usage:
 *   node scripts/run.js --tool <tool_name> [options]
 *   node scripts/run.js --list-tools
 *   node scripts/run.js --schema <tool_name>
 *
 * Options:
 *   --tool <name>       MCP tool name to call  (required for tool calls)
 *   --params <json>     Tool parameters as JSON string  (default: {})
 *   --page-num <n>      Page number for analytics endpoints  (default: 1)
 *   --page-size <n>     Items per page for analytics endpoints  (default: 20)
 *   --all-pages         Auto-fetch ALL pages and merge list results
 *   --no-cache          Skip cache lookup, force a fresh API call
 *   --no-images         Skip automatic cover-image URL conversion
 *   --cache-dir <path>  Cache directory  (default: .keyapi-cache)
 *   --output <path>     Also save result to this file path
 *   --pretty            Pretty-print JSON output to stdout
 *   --list-tools        List all available tools on the MCP server
 *   --schema <name>     Show the input schema for a specific tool
 *   --help              Show this help
 *
 * Environment variables:
 *   KEYAPI_TOKEN        Required. Get yours at https://keyapi.ai/
 *   KEYAPI_SERVER_URL   Optional MCP server URL override.
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { createHash } from "crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parseArgs } from "util";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── Config ────────────────────────────────────────────────────────────────────

const SERVER_URL = process.env.KEYAPI_SERVER_URL ?? "https://mcp.keyapi.ai";
const TOKEN = process.env.KEYAPI_TOKEN;
const COVER_IMAGE_HOST = "echosell-images.tos-ap-southeast-1.volces.com";

/** All analytics endpoints that accept page_num / page_size */
const ANALYTICS_TOOLS = new Set([
  "influencer_list_analytics",    "influencer_detail_analytics",
  "influencer_trends_analytics",  "influencer_videos_analytics",
  "influencer_livestreams_analytics", "influencer_products_analytics",
  "influencer_ranking_analytics",
  "product_list_analytics",       "product_detail_analytics",
  "product_trends_analytics",     "product_reviews_analytics",
  "product_creators_analytics",   "product_videos_analytics",
  "product_livestreams_analytics","product_ranking_analytics",
  "shop_list_analytics",          "shop_detail_analytics",
  "shop_trends_analytics",        "shop_products_analytics",
  "shop_creators_analytics",      "shop_videos_analytics",
  "shop_livestreams_analytics",   "shop_ranking_analytics",
  "video_list_analytics",         "video_detail_analytics",
  "video_trends_analytics",       "video_products_analytics",
  "video_ranking_analytics",
  "primary_categories_analytics", "secondary_categories_analytics",
  "tertiary_categories_analytics","general_search_analytics",
]);

// ── Help text ─────────────────────────────────────────────────────────────────

const HELP = `KeyAPI MCP Tool Runner
======================

Calls KeyAPI MCP tools with caching, auto-pagination, and cover-image conversion.

Usage:
  node scripts/run.js --tool <tool_name> [options]
  node scripts/run.js --list-tools
  node scripts/run.js --schema <tool_name>

Options:
  --tool <name>       MCP tool name to call  (required for tool calls)
  --params <json>     Tool parameters as JSON string  (default: {})
  --page-num <n>      Page number for analytics endpoints  (default: 1)
  --page-size <n>     Items per page for analytics endpoints  (default: 20)
  --all-pages         Auto-fetch ALL pages and merge list results
  --no-cache          Skip cache lookup, force a fresh API call
  --no-images         Skip automatic cover-image URL conversion
  --cache-dir <path>  Cache directory  (default: .keyapi-cache)
  --output <path>     Also save result to this file path
  --pretty            Pretty-print JSON output to stdout
  --list-tools        List all available tools on the MCP server
  --schema <name>     Show the input schema for a specific tool
  --help              Show this help

Environment:
  KEYAPI_TOKEN        Required. Get yours at https://keyapi.ai/
  KEYAPI_SERVER_URL   Optional MCP server URL override  (default: https://mcp.keyapi.ai)

Examples:
  # Search for TikTok influencers
  node scripts/run.js --tool search_influencers \\
    --params '{"keyword":"fitness","region":"US"}' --pretty

  # Get influencer detail (result is cached — instant on the second call)
  node scripts/run.js --tool get_influencer_detail \\
    --params '{"unique_id":"somehandle"}'

  # Fetch ALL pages of a product analytics query at once
  node scripts/run.js --tool product_list_analytics \\
    --params '{"keyword":"wireless earbuds"}' --all-pages --page-size 50

  # Get trending hashtags and save the result to a file
  node scripts/run.js --tool trending_hashtags \\
    --params '{"region":"US"}' --pretty --output results/hashtags.json

  # List every tool available on the server
  node scripts/run.js --list-tools

  # Show the input schema for a specific tool
  node scripts/run.js --schema influencer_list_analytics
`;

// ── File / cache utilities ────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function readJSON(path) {
  try {
    if (existsSync(path)) return JSON.parse(readFileSync(path, "utf8"));
  } catch { /* ignore */ }
  return null;
}

function writeJSON(path, data) {
  ensureDir(dirname(path));
  writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
}

/** Deterministic cache key: .keyapi-cache/<tool>/<hash>.json */
function cacheKey(tool, params, cacheDir) {
  const hash = createHash("md5")
    .update(JSON.stringify(params, Object.keys(params).sort()))
    .digest("hex")
    .slice(0, 16);
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return join(cacheDir, date, tool, `${hash}.json`);
}

// ── Cover-image helpers ───────────────────────────────────────────────────────

function collectImageUrls(obj, acc = []) {
  if (!obj || typeof obj !== "object") return acc;
  if (Array.isArray(obj)) {
    for (const item of obj) collectImageUrls(item, acc);
  } else {
    for (const v of Object.values(obj)) {
      if (typeof v === "string" && v.includes(COVER_IMAGE_HOST)) acc.push(v);
      else collectImageUrls(v, acc);
    }
  }
  return acc;
}

function replaceImageUrls(obj, map) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(i => replaceImageUrls(i, map));
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) =>
      typeof v === "string" && map.has(v) ? [k, map.get(v)] : [k, replaceImageUrls(v, map)]
    )
  );
}

// ── Heuristic list extractor for --all-pages ─────────────────────────────────

const LIST_KEYS = [
  "list", "items", "results", "videos", "products", "creators",
  "shops", "influencers", "hashtags", "music", "ads", "data",
];

function extractList(data) {
  const d = data?.data ?? data;
  for (const k of LIST_KEYS) {
    if (Array.isArray(d?.[k])) return d[k];
  }
  return Array.isArray(d) ? d : [];
}

// ── MCP client ────────────────────────────────────────────────────────────────

async function connect() {
  if (!TOKEN) {
    throw new Error(
      "KEYAPI_TOKEN is not set.\n" +
      "  → Register at https://keyapi.ai/ to obtain a free token, then run:\n" +
      "    export KEYAPI_TOKEN=your_token_here"
    );
  }

  const client = new Client({ name: "keyapi-runner", version: "1.0.0" });
  const transport = new StreamableHTTPClientTransport(
    new URL(SERVER_URL),
    { requestInit: { headers: { Authorization: `Bearer ${TOKEN}` } } }
  );
  await client.connect(transport);
  return client;
}

/** Call a tool, parse the text/JSON response, retry once on code=500 */
async function callTool(client, tool, args) {
  for (let attempt = 0; attempt <= 1; attempt++) {
    const raw = await client.callTool({ name: tool, arguments: args });
    const textBlock = raw?.content?.find(c => c.type === "text");
    let data;
    try { data = textBlock ? JSON.parse(textBlock.text) : raw; }
    catch { data = { raw: textBlock?.text ?? raw }; }

    if (data?.code === 500 && attempt === 0) {
      log(`[retry] ${tool} returned code=500, retrying in 2s…`);
      await sleep(2000);
      continue;
    }
    return data;
  }
}

/** Batch-convert all echosell cover image URLs found in a response object */
async function convertImages(client, data) {
  const urls = [...new Set(collectImageUrls(data))];
  if (urls.length === 0) return data;

  try {
    const result = await callTool(client, "batch_download_cover_images", { image_urls: urls });
    if (result?.code === 0 && result?.data) {
      const map = new Map();
      if (Array.isArray(result.data)) {
        for (const { original_url, converted_url } of result.data) {
          if (original_url && converted_url) map.set(original_url, converted_url);
        }
      } else if (typeof result.data === "object") {
        for (const [k, v] of Object.entries(result.data)) map.set(k, v);
      }
      if (map.size > 0) {
        log(`[images] Converted ${map.size} cover image URL(s)`);
        return replaceImageUrls(data, map);
      }
    }
  } catch (e) {
    log(`[images] Warning: cover image conversion failed — ${e.message}`);
  }
  return data;
}

// ── Commands ──────────────────────────────────────────────────────────────────

async function cmdListTools(client) {
  const { tools } = await client.listTools();
  const out = tools.map(t => ({
    name: t.name,
    description: (t.description ?? "").slice(0, 100),
  }));
  emit(out, null, true);
}

async function cmdSchema(client, toolName) {
  const { tools } = await client.listTools();
  const tool = tools.find(t => t.name === toolName);
  if (!tool) {
    throw new Error(
      `Tool "${toolName}" not found on the server.\n` +
      "  Run --list-tools to see all available tools."
    );
  }
  emit(tool, null, true);
}

async function cmdRun(client, opts) {
  const { tool, params, pageNum, pageSize, allPages, noCache, noImages, cacheDir, output, pretty } = opts;

  // ── Single page ────────────────────────────────────────────────────────────
  if (!allPages) {
    const finalParams = { ...params };
    if (ANALYTICS_TOOLS.has(tool)) {
      if (!("page_num"  in finalParams)) finalParams.page_num  = pageNum;
      if (!("page_size" in finalParams)) finalParams.page_size = pageSize;
    }

    const cachePath = cacheKey(tool, finalParams, cacheDir);
    if (!noCache) {
      const cached = readJSON(cachePath);
      if (cached) {
        log(`[cache] Loaded from ${cachePath}`);
        emit(cached, output, pretty);
        return;
      }
    }

    let data = await callTool(client, tool, finalParams);
    assertSuccess(data, tool);
    if (!noImages) data = await convertImages(client, data);
    writeJSON(cachePath, data);
    emit(data, output, pretty);
    return;
  }

  // ── All pages ──────────────────────────────────────────────────────────────
  let page = 1;
  let allItems = [];
  let lastData = null;

  while (true) {
    const pageParams = { ...params, page_num: page, page_size: pageSize };
    const cachePath = cacheKey(tool, pageParams, cacheDir);

    let data = noCache ? null : readJSON(cachePath);
    if (data) {
      log(`[cache] Page ${page} loaded from ${cachePath}`);
    } else {
      data = await callTool(client, tool, pageParams);
      if (data?.code !== undefined && data.code !== 0) {
        log(`[warn] API error on page ${page}: code=${data.code} — ${data.message ?? ""}`);
        break;
      }
      if (!noImages) data = await convertImages(client, data);
      writeJSON(cachePath, data);
    }

    const items = extractList(data);
    if (items.length === 0) break;

    allItems = allItems.concat(items);
    lastData = data;
    log(`[page ${page}] ${items.length} items  (total so far: ${allItems.length})`);

    const hasMore = data?.data?.has_more ?? data?.has_more;
    if (hasMore === false || items.length < pageSize) break;
    page++;
  }

  const merged = {
    ...lastData,
    _merged: { total_pages: page, total_items: allItems.length },
    items: allItems,
  };
  // Cache the merged result too
  writeJSON(cacheKey(tool, { ...params, _all_pages: true }, cacheDir), merged);
  emit(merged, output, pretty);
}

// ── Output / logging ──────────────────────────────────────────────────────────

function emit(data, filePath, pretty) {
  console.log(pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data));
  if (filePath) {
    const abs = resolve(filePath);
    ensureDir(dirname(abs));
    writeFileSync(abs, JSON.stringify(data, null, 2), "utf8");
    log(`[output] Saved to ${abs}`);
  }
}

function log(msg) { process.stderr.write(msg + "\n"); }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function assertSuccess(data, tool) {
  if (data?.code !== undefined && data.code !== 0) {
    throw new Error(`API error from "${tool}": code=${data.code} — ${data.message ?? "(no message)"}`);
  }
}

// ── Entry point ───────────────────────────────────────────────────────────────

async function main() {
  const { values } = parseArgs({
    options: {
      tool:          { type: "string"  },
      schema:        { type: "string"  },
      params:        { type: "string",  default: "{}" },
      "page-num":    { type: "string",  default: "1"  },
      "page-size":   { type: "string",  default: "20" },
      "all-pages":   { type: "boolean", default: false },
      "no-cache":    { type: "boolean", default: false },
      "no-images":   { type: "boolean", default: false },
      "cache-dir":   { type: "string"  },
      output:        { type: "string"  },
      pretty:        { type: "boolean", default: false },
      "list-tools":  { type: "boolean", default: false },
      help:          { type: "boolean", default: false },
    },
    strict: false,
  });

  const needsHelp = values.help || (!values.tool && !values["list-tools"] && !values.schema);
  if (needsHelp) {
    process.stdout.write(HELP);
    process.exit(0);
  }

  let params;
  try { params = JSON.parse(values.params); }
  catch { throw new Error(`--params is not valid JSON: ${values.params}`); }

  const cacheDir = values["cache-dir"]
    ? resolve(values["cache-dir"])
    : join(ROOT, ".keyapi-cache");

  const client = await connect();

  try {
    if (values["list-tools"]) {
      await cmdListTools(client);
    } else if (values.schema) {
      await cmdSchema(client, values.schema);
    } else {
      await cmdRun(client, {
        tool:     values.tool,
        params,
        pageNum:  parseInt(values["page-num"],  10),
        pageSize: parseInt(values["page-size"], 10),
        allPages: values["all-pages"],
        noCache:  values["no-cache"],
        noImages: values["no-images"],
        cacheDir,
        output:   values.output,
        pretty:   values.pretty,
      });
    }
  } finally {
    await client.close().catch(() => {});
  }
}

main().catch(err => {
  process.stderr.write(`Error: ${err.message ?? String(err)}\n`);
  process.exit(1);
});
