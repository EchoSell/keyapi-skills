---
name: keyapi-google-search
description: Search and extract Google data - retrieve web results, images, videos, places, maps, reviews, news, shopping results, Lens lookups, scholar results, patents, autocomplete suggestions, and webpage content.
metadata: {"openclaw":{"requires":{"env":["KEYAPI_TOKEN"],"bins":["node"]},"primaryEnv":"KEYAPI_TOKEN","emoji":"🔍"}}
author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

# keyapi-google-search

> Search and extract Google data - from general web results and images to maps, reviews, news, shopping, Lens, scholar, patents, autocomplete, and webpage content.

This skill provides Google search intelligence using the KeyAPI MCP service. It enables keyword-based Google web search, image search, video search, local place search, maps lookups, place review retrieval, news discovery, shopping results, Lens lookups by image URL, scholar and patents research, autocomplete suggestions, and webpage extraction - all through a unified, cache-first workflow.

Use this skill when you need to:
- Retrieve ranked Google search results for any keyword query
- Search Google Images or Google Videos for visual content
- Look up places, map results, and reviews
- Monitor Google News and Shopping results
- Run Google Lens lookups from an image URL
- Research scholar papers or patents
- Fetch autocomplete suggestions for a query
- Extract structured webpage content from a URL

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| **KEYAPI_TOKEN** | A valid API token from [keyapi.ai](https://keyapi.ai/). Register at the site to obtain your free token. Set it as an environment variable: `export KEYAPI_TOKEN=your_token_here` |
| **Node.js** | v18 or higher |
| **Dependencies** | Run `npm install` in the skill directory to install `@modelcontextprotocol/sdk` |

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## MCP Server Configuration

All tool calls in this skill target the KeyAPI Google MCP server:

```
Server URL : https://mcp.keyapi.ai/google/mcp
Auth Header: Authorization: Bearer $KEYAPI_TOKEN
```

**Setup (one-time):**

```bash
# 1. Install dependencies
npm install

# 2. Set your API token (get one free at https://keyapi.ai/)
export KEYAPI_TOKEN=your_token_here

# 3. List all available tools to verify the connection
node scripts/run.js --platform google --list-tools
```

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## Analysis Scenarios

| User Need | Node(s) | Best For |
|-----------|---------|----------|
| Ranked Google web search results | `search` | Content research, competitive analysis, SERP monitoring |
| Image search results | `images` | Visual content discovery, brand image monitoring, asset research |
| Video search results | `videos` | Video discovery and media research |
| Local place search | `places` | Local business discovery and location research |
| Google Maps place lookup | `maps` | Map result lookup using query and coordinates |
| Place reviews | `reviews` | Review analysis and sentiment research |
| News results | `news` | News monitoring and topic tracking |
| Shopping results | `shopping` | Product research and shopping intelligence |
| Lens search by image URL | `image_searchlens` | Reverse image lookup |
| Scholar search | `scholar` | Academic and research discovery |
| Patent search | `patents` | Patent discovery and prior-art research |
| Query suggestions | `autocomplete` | Search intent and keyword expansion |
| Webpage extraction | `webpage` | Extract page content from a URL |

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## Workflow

### Step 1 - Select the Right Google Node

- **General search research**: Use `search` for standard Google web results.
- **Visual research**: Use `images` or `videos` depending on whether you need image or video results.
- **Local research**: Use `places`, `maps`, and `reviews` for local business and place intelligence.
- **Monitoring**: Use `news` and `shopping` for news and product discovery.
- **Specialized research**: Use `image_searchlens`, `scholar`, `patents`, `autocomplete`, or `webpage` for targeted workflows.

> **Page-based tools**
>
> `search`, `images`, `videos`, `places`, `maps`, `news`, `shopping`, `scholar`, and `patents` support `page` for pagination.

> **Token-based reviews pagination**
>
> `reviews` uses `nextPageToken` from the previous response instead of a numeric `page`.

> **Common parameters**
>
> - Most search tools require `q`
> - `gl` controls country targeting and `hl` controls language
> - `tbs` controls date filtering where supported
> - `images` additionally supports `num`
> - `maps` requires `q` and `ll`
> - `reviews` requires `fid`
> - `image_searchlens` and `webpage` require `url`

### Step 2 - Retrieve API Schema

Before calling any node, inspect its input schema to confirm required parameters and available options:

```bash
node scripts/run.js --platform google --schema search
node scripts/run.js --platform google --schema reviews
node scripts/run.js --platform google --schema webpage
```

### Step 3 - Call APIs and Cache Results Locally

Execute tool calls and persist responses to the local cache to avoid redundant API calls.

**Calling a tool:**

```bash
# Single call with pretty output
node scripts/run.js --platform google --tool <tool_name> \
  --params '<json_args>' --pretty

# Force fresh data, skip cache
node scripts/run.js --platform google --tool <tool_name> \
  --params '<json_args>' --no-cache --pretty
```

**Example - web search:**

```bash
node scripts/run.js --platform google --tool search \
  --params '{"q":"apple inc","gl":"us","hl":"en","page":1}' --pretty
```

**Example - image search:**

```bash
node scripts/run.js --platform google --tool images \
  --params '{"q":"wireless earbuds product photography","gl":"us","hl":"en","page":1,"num":10}' --pretty
```

**Example - maps search:**

```bash
node scripts/run.js --platform google --tool maps \
  --params '{"q":"coffee shops","ll":"37.7749,-122.4194","hl":"en","page":1}' --pretty
```

**Example - reviews lookup:**

```bash
node scripts/run.js --platform google --tool reviews \
  --params '{"fid":"0x808f7e2bcd123456:0xabcdef1234567890","hl":"en","gl":"us"}' --pretty
```

**Example - news search:**

```bash
node scripts/run.js --platform google --tool news \
  --params '{"q":"OpenAI","gl":"us","hl":"en","page":1}' --pretty
```

**Example - webpage extraction:**

```bash
node scripts/run.js --platform google --tool webpage \
  --params '{"url":"https://www.apple.com/","includeMarkdown":true}' --pretty
```

**Pagination reference:**

| Endpoint | Pagination | Notes |
|---|---|---|
| `search`, `images`, `videos`, `places`, `maps`, `news`, `shopping`, `scholar`, `patents` | `page` | Increment `page` for the next batch |
| `reviews` | `nextPageToken` | Pass `nextPageToken` from the previous response |
| `autocomplete`, `image_searchlens`, `webpage` | None | Single-call tools |

**Parameter reference:**

| Endpoint | Parameter | Description | Example values |
|---|---|---|---|
| Most search tools | `q` | Search query (required) | `"apple inc"` |
| Most search tools | `gl` | Country code | `us`, `uk`, `de` |
| Most search tools | `hl` | Language code | `en`, `zh-cn` |
| Search tools with date filter | `tbs` | Date range filter | `qdr:a`, `qdr:d`, `qdr:w`, `qdr:m` |
| `images` | `num` | Results per page | `10`, `20` |
| Page-based tools | `page` | Page number | `1`, `2`, `3` |
| `maps` | `ll` | Latitude and longitude | `"37.7749,-122.4194"` |
| `reviews` | `fid` | Google feature ID | `"0x..."` |
| `reviews` | `nextPageToken` | Token for next page | `"<token>"` |
| `image_searchlens`, `webpage` | `url` | Target URL | `"https://example.com"` |

**Cache directory structure:**

```
.keyapi-cache/
└── YYYY-MM-DD/
    ├── search/
    │   └── {params_hash}.json
    ├── images/
    │   └── {params_hash}.json
    ├── maps/
    │   └── {params_hash}.json
    └── ...
```

**Cache-first policy:**

Before every API call, check whether a cached result already exists for the given parameters. If a valid cache file exists, load from disk and skip the API call.

### Step 4 - Synthesize and Report Findings

After collecting all API responses, produce a structured search intelligence report:

**For search, news, scholar, or patents:**
1. **Results Overview** - Total result count, top sources, ranking patterns.
2. **Content Analysis** - Key themes, repeated entities, and notable findings.
3. **Research Findings** - Synthesized answer from the top results relevant to the query intent.

**For images, videos, or Lens:**
1. **Media Inventory** - Result count, source domains, and media type distribution.
2. **Visual Themes** - Common subjects, styles, and repeated assets.
3. **Source Attribution** - Top domains providing the media.

**For places, maps, and reviews:**
1. **Location Overview** - Place name, location, rating, and category.
2. **Review Analysis** - Common themes, sentiment, and standout feedback.
3. **Operational Signals** - Hours, popularity, and notable service details when available.

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## Common Rules

| Rule | Detail |
|------|--------|
| **Page-based tools** | `search`, `images`, `videos`, `places`, `maps`, `news`, `shopping`, `scholar`, and `patents` use `page`. |
| **Review pagination** | `reviews` uses `nextPageToken`, not `page`. |
| **Single-call tools** | `autocomplete`, `image_searchlens`, and `webpage` do not paginate. |
| **Maps identifiers** | `maps` requires `q` and `ll`; `placeId` and `cid` are optional. |
| **Review identifiers** | `reviews` requires `fid`; `cid` and `placeId` are optional. |
| **Success check** | `code = 0` -> success. Any other value -> failure. Always check the response code before processing data. |
| **Retry on 500** | If `code = 500`, retry the identical request up to 3 times with a 2-3 second pause between attempts before reporting the error. |
| **Cache first** | Always check the local `.keyapi-cache/` directory before issuing a live API call. |

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## Error Handling

| Code | Meaning | Action |
|------|---------|--------|
| `0` | Success | Continue workflow normally |
| `400` | Bad request - invalid or missing parameters | Ensure required parameters such as `q`, `fid`, `ll`, or `url` are present; check enum values such as `tbs` or `sortBy` |
| `401` | Unauthorized - token missing or expired | Confirm `KEYAPI_TOKEN` is set correctly; visit [keyapi.ai](https://keyapi.ai/) to renew |
| `402` | Payment required - quota not enough | Review plan quota at [keyapi.ai](https://keyapi.ai/) |
| `403` | Forbidden - feature restricted | Review plan access at [keyapi.ai](https://keyapi.ai/) |
| `429` | Rate limit exceeded | Wait 60 seconds, then retry |
| `500` | Internal server error | Retry up to 3 times with a 2-3 second pause; if it persists, log the full request and response and skip this node |
| Other non-0 | Unexpected error | Log the full response body and surface the error message to the user |
