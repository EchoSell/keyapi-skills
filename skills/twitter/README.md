# Twitter Skills — KeyAPI

One AI agent skill for comprehensive Twitter/X data analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-twitter-content-analytics](keyapi-twitter-content-analytics/SKILL.md) | Explore and analyze Twitter/X content | 11 nodes — tweets, user profiles, posts, replies, media, comments, retweets, search, trending, followers, following |

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
cp -r keyapi-twitter-content-analytics ~/.claude/skills/
cd ~/.claude/skills/keyapi-twitter-content-analytics && npm install
```

**OpenClaw** — copy to `~/.openclaw/skills/`:

```bash
cp -r keyapi-twitter-content-analytics ~/.openclaw/skills/
cd ~/.openclaw/skills/keyapi-twitter-content-analytics && npm install
```

**API token** — required on first run. Get yours at [keyapi.ai](https://keyapi.ai/):

```bash
# Option A: environment variable (current session only)
export KEYAPI_TOKEN=your_token_here

# Option B: .env file in the skill directory (persists across sessions)
echo "KEYAPI_TOKEN=your_token_here" > ~/.claude/skills/keyapi-twitter-content-analytics/.env
```

> If `KEYAPI_TOKEN` is not set and you run the script in a terminal, you will be prompted to enter it and it will be saved to `.env` automatically.

## Quick Start

```bash
# Verify connection
cd keyapi-twitter-content-analytics
node scripts/run.js --platform twitter --list-tools
```

## Common Rules

All Twitter skills share these rules:

- **Pagination**: Cursor-based (`cursor` from `next_cursor`) — not numeric page numbers
- **User identification**: Most endpoints accept `screen_name` or `rest_id` — some require `screen_name` only
- **Tweet ID extraction**: Extract from URL `x.com/user/status/TWEET_ID`
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
- **No cover image conversion**: Twitter images are served directly — no proxy conversion needed
