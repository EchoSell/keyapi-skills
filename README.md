# KeyAPI Agent Skills

A collection of agent skills for the [KeyAPI](https://keyapi.ai/) MCP service, organized by platform. These skills enable AI agents (via Claude Code or any MCP-compatible client) to perform structured, multi-step data analysis workflows using KeyAPI's rich analytics endpoints.

## What Are Skills?

Each skill is a self-contained workflow guide (`SKILL.md`) that instructs an AI agent how to:
1. Select the right API nodes for a given analysis objective
2. Authenticate and call the KeyAPI MCP server via `mcpc`
3. Cache results locally for reuse and efficiency
4. Synthesize data into actionable insights

---

## Prerequisites (All Skills)

| Requirement | Details |
|-------------|---------|
| **KEYAPI_TOKEN** | Register at [keyapi.ai](https://keyapi.ai/) to obtain your free API token. Set it: `export KEYAPI_TOKEN=your_token_here` |
| **Node.js** | v18 or higher |
| **Dependencies** | Run `npm install` in the project root |

**Quick start:**

```bash
npm install
export KEYAPI_TOKEN=your_token_here

# Verify the connection
node scripts/run.js --list-tools

# Inspect a tool's input schema
node scripts/run.js --schema search_influencers

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
| **Pagination** | All `*_analytics` endpoints use `page_num` (starts at `1`) and `page_size`. Never use page `0`. |
| **Cover images** | Batch-convert all image URLs with host `echosell-images.tos-ap-southeast-1.volces.com` via `batch_download_cover_images` before storing or displaying any image. |
| **Success check** | `code = 0` → success. Any other code → failure. Always check before processing data. |
| **Retry on 500** | If `code = 500`, retry once after a brief pause before escalating. |
| **Cache first** | Always check `.keyapi-cache/` before making a live API call. |

---

## Cache Directory Structure

All skills share a unified `.keyapi-cache/` directory at the project root:

```
.keyapi-cache/
├── influencers/           # keyapi-tiktok-influencer-discovery
│   └── {unique_id}/
├── shop_creators/         # keyapi-tiktok-shop-creator-discovery
│   └── {creator_oecuid}/
├── products/              # keyapi-tiktok-ecommerce
│   └── {product_id}/
├── shops/                 # keyapi-tiktok-ecommerce
│   └── {shop_id}/
├── categories/            # keyapi-tiktok-ecommerce
├── videos/                # keyapi-tiktok-content-analysis
│   └── {video_id}/
├── hashtags/              # keyapi-tiktok-content-analysis
│   └── {hashtag}/
├── live_streams/          # keyapi-tiktok-content-analysis
│   └── {stream_id}/
├── intelligence/          # keyapi-tiktok-intelligence
│   ├── trending/
│   ├── keywords/
│   ├── top_products/
│   └── top_ads/
├── searches/              # shared — search result caches
│   ├── influencers/
│   ├── shop_creators/
│   ├── products/
│   ├── shops/
│   ├── videos/
│   ├── hashtags/
│   ├── music/
│   ├── live_streams/
│   └── general/
├── rankings/              # shared — ranking result caches
│   ├── influencers_{hash}.json
│   ├── products_{hash}.json
│   ├── shops_{hash}.json
│   └── videos_{hash}.json
└── images/
    └── covers/            # converted cover images from batch_download_cover_images
```

---

## Adding New Platform Skills

When adding skills for a new platform, create a directory under `skills/{platform}/` and follow the same `SKILL.md` structure used for TikTok skills. Each skill should be self-contained with its own Prerequisites, MCP Server Configuration, Analysis Scenarios, Workflow, and Error Handling sections.
