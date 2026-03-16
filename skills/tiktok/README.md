# TikTok Skills — KeyAPI

Five AI agent skills for comprehensive TikTok data analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-tiktok-influencer-discovery](keyapi-tiktok-influencer-discovery/SKILL.md) | Find and analyze TikTok creators | 15 nodes — search, profile, analytics, trends, rankings |
| [keyapi-tiktok-shop-creator-discovery](keyapi-tiktok-shop-creator-discovery/SKILL.md) | Evaluate TikTok Shop commerce creators | 6 nodes — creator ID, sales, audience, trends, videos |
| [keyapi-tiktok-ecommerce](keyapi-tiktok-ecommerce/SKILL.md) | TikTok Shop product & shop intelligence | 24 nodes — products, shops, categories, GMV, reviews |
| [keyapi-tiktok-content-analysis](keyapi-tiktok-content-analysis/SKILL.md) | Analyze videos, hashtags, music & live streams | 21 nodes — video data, comments, captions, sentiment |
| [keyapi-tiktok-intelligence](keyapi-tiktok-intelligence/SKILL.md) | Real-time trend & market intelligence | 10 nodes — trending, keyword insights, top ads/products |

## Quick Start

Each skill is self-contained. Install a single skill or use all of them together.

```bash
# Install a single skill (standalone mode)
cd keyapi-tiktok-influencer-discovery
npm install
export KEYAPI_TOKEN=your_token_here
node scripts/run.js --list-tools
```

## Common Rules

All TikTok skills share these rules:

- **Pagination**: `*_analytics` endpoints use `page_num`/`page_size` (max 10). Trending endpoints use `page`/`limit`. Never use page `0`.
- **Cover images**: Always batch-convert images from `echosell-images.tos-ap-southeast-1.volces.com` via `batch_download_cover_images`
- **Response check**: `code = 0` = success; retry once on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
