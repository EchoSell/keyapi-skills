# Threads Skills — KeyAPI

One AI agent skill for comprehensive Threads data analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-threads-user-discovery](keyapi-threads-user-discovery/SKILL.md) | Discover and analyze Threads users and content | 10 nodes — user profile by username or ID, posts, reposts, replies, post detail, post comments, search top/recent content, search profiles |

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
cp -r keyapi-threads-user-discovery ~/.claude/skills/
cd ~/.claude/skills/keyapi-threads-user-discovery && npm install
```

**OpenClaw** — copy to `~/.openclaw/skills/`:

```bash
cp -r keyapi-threads-user-discovery ~/.openclaw/skills/
cd ~/.openclaw/skills/keyapi-threads-user-discovery && npm install
```

**API token** — required on first run. Get yours at [keyapi.ai](https://keyapi.ai/):

```bash
# Option A: environment variable (current session only)
export KEYAPI_TOKEN=your_token_here

# Option B: .env file in the skill directory (persists across sessions)
echo "KEYAPI_TOKEN=your_token_here" > ~/.claude/skills/keyapi-threads-user-discovery/.env
```

> If `KEYAPI_TOKEN` is not set and you run the script in a terminal, you will be prompted to enter it and it will be saved to `.env` automatically.

## Quick Start

Each skill is self-contained.

```bash
# Verify connection
cd keyapi-threads-user-discovery
node scripts/run.js --platform threads --list-tools
```

## Common Rules

- **Identifier types**: `username` for `get_user_info`; `user_id` (numeric) for all content endpoints — call `get_user_info` first to resolve
- **`get_post_detail`**: Accepts shortcode (`post_id`) or full URL (`url`) — pass one, not both
- **Pagination**: Cursor-based via `end_cursor` — omit for first call, pass from previous response for subsequent pages
- **`search_profiles`**: No pagination — returns all results in a single call
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
