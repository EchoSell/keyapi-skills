# Amazon Skills — KeyAPI

One AI agent skill for comprehensive Amazon e-commerce intelligence, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-amazon-ecommerce](keyapi-amazon-ecommerce/SKILL.md) | Explore and analyze Amazon marketplace data | 19 nodes — product search, category browsing, product details, best sellers, deals, reviews, offers, seller intelligence, influencer storefronts, ASIN/GTIN conversion |

## Installation

Each skill directory contains **three required files** — all must be present:

| File | Purpose |
|------|---------|
| `SKILL.md` | Skill definition loaded by your agent |
| `package.json` | Node.js dependency manifest |
| `scripts/run.js` | API execution script called by the agent |

> **All three files are required.** Downloading only `SKILL.md` will not work — `scripts/run.js` and `package.json` must be included.

**Claude Code** — copy to `~/.claude/skills/`:

```bash
cp -r keyapi-amazon-ecommerce ~/.claude/skills/
cd ~/.claude/skills/keyapi-amazon-ecommerce && npm install
```

**OpenClaw** — copy to `~/.openclaw/skills/`:

```bash
cp -r keyapi-amazon-ecommerce ~/.openclaw/skills/
cd ~/.openclaw/skills/keyapi-amazon-ecommerce && npm install
```

**API token** — required on first run. Get yours at [keyapi.ai](https://keyapi.ai/):

```bash
# Option A: environment variable (current session only)
export KEYAPI_TOKEN=your_token_here

# Option B: .env file in the skill directory (persists across sessions)
echo "KEYAPI_TOKEN=your_token_here" > ~/.claude/skills/keyapi-amazon-ecommerce/.env
```

> If `KEYAPI_TOKEN` is not set and you run the script in a terminal, you will be prompted to enter it and it will be saved to `.env` automatically.

## Quick Start

```bash
# Verify connection
cd keyapi-amazon-ecommerce
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
