# Google Skills — KeyAPI

One AI agent skill for Google web and image search, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-google-search](keyapi-google-search/SKILL.md) | Perform Google web and image searches with language and region targeting | 2 nodes — web search (up to 100 results), image search (paginated, up to 20/page) |

## Quick Start

```bash
cd keyapi-google-search
npm install
export KEYAPI_TOKEN=your_token_here
node scripts/run.js --platform google --list-tools
```

## Common Rules

- **`web_search` has no pagination**: Use `num` (1–100) to control result count in a single call
- **`image_search` pagination**: Uses `page` (1-indexed) with `num` (1–20 per page)
- **`lr` format differs**: `web_search` uses `en-US` format; `image_search` uses `lang_en` format
- **`gl` is image-only**: Country targeting via `gl` is available on `image_search` only
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
