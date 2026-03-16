# KeyAPI Agent Skills

A collection of agent skills for the [KeyAPI](https://keyapi.ai/) MCP service, organized by platform. These skills enable AI agents (via Claude Code, OpenClaw, or any MCP-compatible client) to perform structured, multi-step data analysis workflows using KeyAPI's rich analytics endpoints.

## What Are Skills?

Each skill is a self-contained directory containing a `SKILL.md` that instructs an AI agent how to:
1. Select the right API nodes for a given analysis objective
2. Authenticate and call the KeyAPI MCP server via `scripts/run.js`
3. Cache results locally for reuse and efficiency
4. Synthesize data into actionable insights

---

## Two Usage Modes

### Mode A — Standalone skill (Claude Code / OpenClaw)

Download a single skill directory and use it independently:

```bash
# Example: install the influencer-discovery skill
cp -r skills/tiktok/keyapi-tiktok-influencer-discovery ~/.claude/skills/

cd ~/.claude/skills/keyapi-tiktok-influencer-discovery
npm install
export KEYAPI_TOKEN=your_token_here

# Verify
node scripts/run.js --list-tools

# Run a tool
node scripts/run.js --tool search_influencers \
  --params '{"keyword":"fitness","region":"US"}' --pretty
```

### Mode B — Full project clone (development / all skills)

Clone the whole repo and use any skill from the project root:

```bash
git clone https://github.com/EchoSell/keyapi-skills.git
cd keyapi-skills
npm install
export KEYAPI_TOKEN=your_token_here

# Verify
node scripts/run.js --list-tools

# Run a tool
node scripts/run.js --tool search_influencers \
  --params '{"keyword":"fitness","region":"US"}' --pretty
```

**MCP Server:** `https://mcp.keyapi.ai`
**Auth:** `Authorization: Bearer $KEYAPI_TOKEN`

---

## Skills Index

### TikTok Platform

| Skill | Description |
|-------|-------------|
| [keyapi-tiktok-influencer-discovery](skills/tiktok/keyapi-tiktok-influencer-discovery/SKILL.md) | Discover, profile, and analyze TikTok influencers — search, analytics, trends, live commerce, and rankings |
| [keyapi-tiktok-shop-creator-discovery](skills/tiktok/keyapi-tiktok-shop-creator-discovery/SKILL.md) | Analyze TikTok Shop creators — sales metrics, GMV, audience demographics, and content performance |
| [keyapi-tiktok-ecommerce](skills/tiktok/keyapi-tiktok-ecommerce/SKILL.md) | Comprehensive TikTok Shop market intelligence — products, shops, categories, GMV, reviews, and competitive dynamics |
| [keyapi-tiktok-content-analysis](skills/tiktok/keyapi-tiktok-content-analysis/SKILL.md) | Analyze TikTok content — videos, hashtags, music, live streams, comments, and sentiment at scale |
| [keyapi-tiktok-intelligence](skills/tiktok/keyapi-tiktok-intelligence/SKILL.md) | Real-time TikTok trend intelligence — trending topics, viral music, breakout videos, top ads, and product insights |

---

## Common Rules (All TikTok Skills)

These rules apply to every TikTok skill and should be observed in all workflows:

| Rule | Detail |
|------|--------|
| **Pagination** | `*_analytics` endpoints use `page_num`/`page_size` (starts at `1`, max `10`). Trending endpoints (`trending_*`, `keyword_insights`, `top_*_insights`) use `page`/`limit`. Never use page `0`. |
| **Cover images** | Batch-convert all image URLs with host `echosell-images.tos-ap-southeast-1.volces.com` via `batch_download_cover_images` before storing or displaying any image. |
| **Success check** | `code = 0` → success. Any other code → failure. Always check before processing data. |
| **Retry on 500** | If `code = 500`, retry once after a brief pause before escalating. |
| **Cache first** | Always check `.keyapi-cache/` before making a live API call. Cache is date-scoped (`YYYY-MM-DD`); data from a previous day is automatically bypassed. |

---

## Cache Directory Structure

Each skill stores its cache under `.keyapi-cache/` **inside its own directory**:

```
<skill-dir>/
└── .keyapi-cache/
    └── YYYY-MM-DD/
        └── <tool>/
            └── <params-hash>.json
```

When using the full project clone (Mode B), all skills share `.keyapi-cache/` at the project root.

---

## Keeping `scripts/run.js` in Sync

`scripts/run.js` at the project root is the **single source of truth**. Each skill directory bundles its own copy for standalone use.

After editing `scripts/run.js`, run:

```bash
npm run sync
# or: bash scripts/sync-to-skills.sh
```

This copies `scripts/run.js` into every `skills/*/*/scripts/run.js` automatically.

---

## Adding New Platform Skills

1. Create a directory under `skills/{platform}/skill-name/`
2. Add `SKILL.md` with YAML frontmatter (`name`, `description`, `metadata`) and workflow body
3. The `scripts/run.js` and `package.json` will be synced in automatically via `npm run sync`
4. Supported platforms: `tiktok`, `instagram`, `twitter`, `youtube`, `threads`, `reddit`, `linkedin`, `facebook`, `amazon`, `pinterest`, `google`
