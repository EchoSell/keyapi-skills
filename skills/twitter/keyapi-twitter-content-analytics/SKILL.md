---
name: keyapi-twitter-content-analytics
description: Explore and analyze Twitter/X content at scale — retrieve user profiles, tweets, comments, replies, media, search across content types, monitor trending topics, and analyze follower/following networks.
metadata: {"openclaw":{"requires":{"env":["KEYAPI_TOKEN"],"bins":["node"]},"primaryEnv":"KEYAPI_TOKEN","emoji":"🐦"}}
author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

# keyapi-twitter-content-analytics

> Explore and analyze Twitter/X content at scale — from user profiles and tweet threads to search, trending topics, and social graph analysis.

This skill provides comprehensive Twitter/X intelligence using the KeyAPI MCP service. It enables detailed tweet inspection, user profile retrieval, comment and reply thread analysis, media library enumeration, multi-type search (Top, Latest, Media, People, Lists), trending topic monitoring across countries, and follower/following network exploration — all through a cache-first workflow.

Use this skill when you need to:
- Retrieve full tweet details including engagement metrics, media, and quoted content
- Fetch user profiles with follower counts, bio, verification status, and account metadata
- Analyze a user's tweet timeline, replies, and media library
- Read comment threads under any tweet with pagination support
- Search Twitter by query across multiple result types (Top, Latest, Media, People, Lists)
- Monitor trending topics and hashtags by country or globally
- Explore social graphs — analyze who a user follows and who follows them
- Identify users who retweeted a specific tweet

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| **KEYAPI_TOKEN** | A valid API token from [keyapi.ai](https://keyapi.ai/). If you don't have one, register at the site to obtain your free token. Set it as an environment variable: `export KEYAPI_TOKEN=your_token_here` |
| **Node.js** | v18 or higher |
| **Dependencies** | Run `npm install` in the skill directory to install `@modelcontextprotocol/sdk` |

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## MCP Server Configuration

All tool calls in this skill target the KeyAPI Twitter MCP server:

```
Server URL : https://mcp.keyapi.ai/twitter/mcp
Auth Header: Authorization: Bearer $KEYAPI_TOKEN
```

**Setup (one-time):**

```bash
# 1. Install dependencies
npm install

# 2. Set your API token (get one free at https://keyapi.ai/)
export KEYAPI_TOKEN=your_token_here

# 3. List all available tools to verify the connection
node scripts/run.js --platform twitter --list-tools
```

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## Analysis Scenarios

### Tweet & User Nodes

| User Need | Node(s) | Best For |
|-----------|---------|----------|
| Full tweet details (metrics, media, quoted content) | `tweet_info` | Tweet audit, engagement snapshot — requires `id` from URL |
| User profile with bio, follower counts, verification | `user_info` | Profile overview — requires `screenname`; accepts optional `rest_id` |
| User's tweet timeline | `user_timeline` | Content inventory, posting cadence analysis — requires `screenname`; accepts optional `rest_id` |
| User's tweet replies | `user_replies` | Reply activity, conversation participation — requires `screenname` |
| User's media library (photos/videos) | `users_media` | Visual content audit — requires `screenname`; accepts optional `rest_id` |

### Comment & Engagement Nodes

| User Need | Node(s) | Best For |
|-----------|---------|----------|
| Comments / replies under a tweet | `tweet_thread`, `latest_replies` | Audience sentiment, comment volume analysis |
| Users who retweeted a tweet | `retweets` | Amplification analysis, retweet network mapping |

### Search & Discovery Nodes

| User Need | Node(s) | Best For |
|-----------|---------|----------|
| Search by query (multi-type) | `search` | Broad discovery — filter by Top, Latest, Media, People, Lists |
| Trending topics by country | `trends` | Real-time trend monitoring — supports 50+ countries |

### Social Graph Nodes

| User Need | Node(s) | Best For |
|-----------|---------|----------|
| Users a profile is following | `following` | Network affinity, brand partnership signals — requires `screenname` |
| Users following a profile | `followers` | Audience sampling, follower demographics — requires `screenname` |

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## Workflow

### Step 1 — Identify the Analysis Objective and Select Nodes

Clarify the research goal and map it to one or more nodes. Common patterns:

- **Tweet analysis**: Extract `id` from URL → `tweet_info` → deepen with `tweet_thread` / `latest_replies` + `retweets`.
- **User profile audit**: Use `user_info` with `screenname` → layer `user_timeline` + `user_replies` + `users_media`.
- **Search research**: Use `search` with `query` and `search_type` filter → paginate with `cursor` for more results.
- **Trend monitoring**: Use `trends` with `country` parameter → cross-reference with `search` for content depth.
- **Social graph analysis**: Use `following` + `followers` with `screenname` → paginate with `cursor`.

> **User identification**
>
> Current Twitter endpoints use `screenname` (e.g., `elonmusk`) and some also accept `rest_id` (numeric user ID, e.g., `44196397`).
> - `user_info` and `user_timeline` require `screenname`; `rest_id` can be passed where the schema exposes it.
> - `user_replies`, `followers`, and `about_profile` require `screenname`.

> **Tweet ID extraction**
>
> Extract the tweet ID from the URL and pass it as `id`:
> - `https://x.com/elonmusk/status/1808168603721650364` → `1808168603721650364`

### Step 2 — Retrieve API Schema

Before calling any node, inspect its input schema to confirm required parameters and available options:

```bash
node scripts/run.js --platform twitter --schema <tool_name>

# Examples
node scripts/run.js --platform twitter --schema tweet_info
node scripts/run.js --platform twitter --schema search
```

### Step 3 — Call APIs and Cache Results Locally

Execute tool calls and persist responses to the local cache.

**Calling a tool:**

```bash
node scripts/run.js --platform twitter --tool <tool_name> \
  --params '<json_args>' --pretty

# Skip cache for fresh results
node scripts/run.js --platform twitter --tool <tool_name> \
  --params '<json_args>' --no-cache --pretty
```

**Example — get tweet details:**

```bash
node scripts/run.js --platform twitter --tool tweet_info \
  --params '{"id":"1808168603721650364"}' --pretty
```

**Example — get user profile:**

```bash
node scripts/run.js --platform twitter --tool user_info \
  --params '{"screenname":"elonmusk"}' --pretty
```

**Example — get user tweets (first page):**

```bash
node scripts/run.js --platform twitter --tool user_timeline \
  --params '{"screenname":"elonmusk"}' --pretty
```

**Example — paginate to next page:**

```bash
node scripts/run.js --platform twitter --tool user_timeline \
  --params '{"screenname":"elonmusk","cursor":"<next_cursor_from_previous_response>"}' --pretty
```

**Example — get comments under a tweet:**

```bash
node scripts/run.js --platform twitter --tool tweet_thread \
  --params '{"id":"1808168603721650364"}' --pretty
```

**Example — search by query (Top results):**

```bash
node scripts/run.js --platform twitter --tool search \
  --params '{"query":"AI","search_type":"Top"}' --pretty
```

**Example — search for latest tweets:**

```bash
node scripts/run.js --platform twitter --tool search \
  --params '{"query":"ChatGPT","search_type":"Latest"}' --pretty
```

**Example — get trending topics (United States):**

```bash
node scripts/run.js --platform twitter --tool trends \
  --params '{"country":"UnitedStates"}' --pretty
```

**Example — get trending topics (Japan):**

```bash
node scripts/run.js --platform twitter --tool trends \
  --params '{"country":"Japan"}' --pretty
```

**Example — get user's followings:**

```bash
node scripts/run.js --platform twitter --tool following \
  --params '{"screenname":"elonmusk"}' --pretty
```

**Example — get user's followers:**

```bash
node scripts/run.js --platform twitter --tool followers \
  --params '{"screenname":"elonmusk"}' --pretty
```

**Example — get retweet user list:**

```bash
node scripts/run.js --platform twitter --tool retweets \
  --params '{"id":"1835124037934367098"}' --pretty
```

**Pagination:**

Paginated Twitter endpoints use `cursor` from the previous response.

| Endpoint | Pagination parameter | Notes |
|---|---|---|
| `user_timeline`, `search`, `tweet_thread`, `latest_replies`, `user_replies`, `users_media`, `retweets`, `following`, `followers` | `cursor` | Pass the next cursor value from the previous response |
| `tweet_info`, `user_info`, `trends` | — | Single-call; no pagination |

**Cache directory structure:**

```
.keyapi-cache/
└── YYYY-MM-DD/
    ├── tweet_info/
    │   └── {params_hash}.json
    ├── user_info/
    │   └── {params_hash}.json
    ├── user_timeline/
    │   └── {params_hash}.json
    ├── search/
    │   └── {params_hash}.json
    ├── tweet_thread/
    │   └── {params_hash}.json
    ├── user_replies/
    │   └── {params_hash}.json
    ├── users_media/
    │   └── {params_hash}.json
    ├── retweets/
    │   └── {params_hash}.json
    ├── trends/
    │   └── {params_hash}.json
    ├── following/
    │   └── {params_hash}.json
    └── followers/
        └── {params_hash}.json
```

**Cache-first policy:**

Before every API call, check whether a cached result already exists. If valid, load from disk and skip the API call.

### Step 4 — Synthesize and Report Findings

**For tweet analysis:**
1. **Tweet Overview** — Text content, author, publish date, view count, like count, retweet count, reply count, quote count.
2. **Engagement Analysis** — Like-to-view ratio, retweet amplification, comment depth.
3. **Media & Links** — Attached images/videos, external links, quoted tweets.
4. **Comment Insights** — Top comment themes, sentiment signals, key discussion points.
5. **Retweet Network** — Who amplified the tweet, account types, reach estimation.

**For user analysis:**
1. **Profile Overview** — Screen name, display name, bio, follower count, following count, tweet count, verification status, account creation date.
2. **Content Patterns** — Posting frequency, media usage, reply activity, content themes.
3. **Social Graph** — Follower-to-following ratio, notable followings/followers where available.
4. **Engagement Quality** — Average engagement per tweet, reply rate, retweet rate.

**For search / discovery:**
1. **Search Results Overview** — Result count, top tweets/users, engagement distribution.
2. **Trending Topics** — Current trending hashtags and topics by country, volume indicators.
3. **Content Themes** — Common topics, hashtags, and discussion patterns.

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## Common Rules

| Rule | Detail |
|------|--------|
| **User identification** | Current user tools use `screenname`; `user_info`, `user_timeline`, `following`, and `users_media` also accept `rest_id` where exposed by the schema. |
| **Tweet ID extraction** | Extract from URL and pass as `id`: `x.com/user/status/TWEET_ID` or `twitter.com/user/status/TWEET_ID`. |
| **Search types** | `search` supports: `Top` (default), `Latest`, `Media`, `People`, `Lists`. Use `query` for the search text. |
| **Trending countries** | `trends` supports 50+ countries including: `UnitedStates`, `China`, `India`, `Japan`, `Russia`, `Germany`, `UnitedKingdom`, `France`, `Brazil`, `Canada`, `Australia`, `SouthKorea`, `Mexico`, `Spain`, `Italy`, `Turkey`, `Indonesia`, `SaudiArabia`, `Egypt`, `Argentina`, `Philippines`, `Singapore`, and more. See schema for full list. |
| **Pagination** | Paginated endpoints use `cursor` from the previous response. |
| **Success check** | `code = 0` → success. Any other value → failure. Always check the response code before processing data. |
| **Retry on 500** | If `code = 500`, retry the identical request up to 3 times with a 2–3 second pause between attempts before reporting the error. |
| **Cache first** | Always check the local `.keyapi-cache/` directory before issuing a live API call. |

author: KeyAPI
license: MIT
repository: https://github.com/EchoSell/keyapi-skills
---

## Error Handling

| Code | Meaning | Action |
|------|---------|--------|
| `0` | Success | Continue workflow normally |
| `400` | Bad request — invalid or missing parameters | Validate input against the tool schema; check `id`, `screenname`, `rest_id`, and search type values |
| `401` | Unauthorized — token missing or expired | Confirm `KEYAPI_TOKEN` is set correctly; visit [keyapi.ai](https://keyapi.ai/) to renew |
| `403` | Forbidden — plan quota exceeded or feature restricted | Review plan limits at [keyapi.ai](https://keyapi.ai/) |
| `404` | Resource not found — tweet or user may be deleted, suspended, or private | Verify the tweet ID or screen name; the content may no longer be available |
| `429` | Rate limit exceeded | Wait 60 seconds, then retry |
| `500` | Internal server error | Retry up to 3 times with a 2–3 second pause; if it persists, log the full request and response and skip this node |
| Other non-0 | Unexpected error | Log the full response body and surface the error message to the user |
