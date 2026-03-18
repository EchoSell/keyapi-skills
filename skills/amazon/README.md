# Amazon Skills — KeyAPI

One AI agent skill for comprehensive Amazon e-commerce intelligence, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-amazon-ecommerce](keyapi-amazon-ecommerce/SKILL.md) | Explore and analyze Amazon marketplace data | 19 nodes — product search, category browsing, product details, best sellers, deals, reviews, offers, seller intelligence, influencer storefronts, ASIN/GTIN conversion |

## Quick Start

```bash
cd keyapi-amazon-ecommerce
npm install
export KEYAPI_TOKEN=your_token_here
node scripts/run.js --platform amazon --list-tools
```

## Common Rules

- **Multi-ASIN batch**: `product_details` and `product_offers` accept up to 10 comma-separated ASINs per call
- **`country` param**: Defaults to `us`. Supports 24 Amazon marketplaces
- **`fields` projection**: Most endpoints accept `fields` to reduce response payload
- **`deals` pagination**: Uses `offset` (not `page`) for pagination
- **Influencer post products**: Only works for posts of type `list`
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
