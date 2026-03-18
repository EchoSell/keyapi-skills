# Pinterest Skills — KeyAPI

One AI agent skill for comprehensive Pinterest user and content analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-pinterest-analysis](keyapi-pinterest-analysis/SKILL.md) | Discover and analyze Pinterest users, pins, boards, and social graphs | 6 nodes — user search, profile info, pins, boards, followers, following |

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
cp -r keyapi-pinterest-analysis ~/.claude/skills/
cd ~/.claude/skills/keyapi-pinterest-analysis && npm install
```

**OpenClaw** — copy to `~/.openclaw/skills/`:

```bash
cp -r keyapi-pinterest-analysis ~/.openclaw/skills/
cd ~/.openclaw/skills/keyapi-pinterest-analysis && npm install
```

**API token** — required on first run. Get yours at [keyapi.ai](https://keyapi.ai/):

```bash
# Option A: environment variable (current session only)
export KEYAPI_TOKEN=your_token_here

# Option B: .env file in the skill directory (persists across sessions)
echo "KEYAPI_TOKEN=your_token_here" > ~/.claude/skills/keyapi-pinterest-analysis/.env
```

> If `KEYAPI_TOKEN` is not set and you run the script in a terminal, you will be prompted to enter it and it will be saved to `.env` automatically.

## Quick Start

```bash
# Verify connection
cd keyapi-pinterest-analysis
node scripts/run.js --platform pinterest --list-tools
```

## Common Rules

- **`get_boards` uses `entry`**: Pass username as the `entry` parameter (not `username`)
- **`userid` resolution**: `get_followers_detail` and `get_following_detail` require numeric `userid` — obtain from `get_user_information` response
- **`get_followers_detail` pagination**: First call: `userid` only. Subsequent: `userid` + `node_id` + `cursor`
- **`get_following_detail` pagination**: Uses `bookmark` (not `cursor`) for pagination
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
