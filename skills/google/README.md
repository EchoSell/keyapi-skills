# Google Skills — KeyAPI

One AI agent skill for Google web and image search, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-google-search](keyapi-google-search/SKILL.md) | Perform Google web and image searches with language and region targeting | 2 nodes — web search (up to 100 results), image search (paginated, up to 20/page) |

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
cp -r keyapi-google-search ~/.claude/skills/
cd ~/.claude/skills/keyapi-google-search && npm install
```

**OpenClaw** — copy to `~/.openclaw/skills/`:

```bash
cp -r keyapi-google-search ~/.openclaw/skills/
cd ~/.openclaw/skills/keyapi-google-search && npm install
```

**API token** — required on first run. Get yours at [keyapi.ai](https://keyapi.ai/):

```bash
# Option A: environment variable (current session only)
export KEYAPI_TOKEN=your_token_here

# Option B: .env file in the skill directory (persists across sessions)
echo "KEYAPI_TOKEN=your_token_here" > ~/.claude/skills/keyapi-google-search/.env
```

> If `KEYAPI_TOKEN` is not set and you run the script in a terminal, you will be prompted to enter it and it will be saved to `.env` automatically.

## Quick Start

```bash
# Verify connection
cd keyapi-google-search
node scripts/run.js --platform google --list-tools
```

## Common Rules

- **`web_search` has no pagination**: Use `num` (1–100) to control result count in a single call
- **`image_search` pagination**: Uses `page` (1-indexed) with `num` (1–20 per page)
- **`lr` format differs**: `web_search` uses `en-US` format; `image_search` uses `lang_en` format
- **`gl` is image-only**: Country targeting via `gl` is available on `image_search` only
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
