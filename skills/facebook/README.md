# Facebook Skills — KeyAPI

One AI agent skill for comprehensive public Facebook data analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-facebook-analysis](keyapi-facebook-analysis/SKILL.md) | Explore and analyze public Facebook profiles, pages, and groups | 10 nodes — profile details, posts, photos, Reels, group posts, group details, group events, ID resolution |

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
cp -r keyapi-facebook-analysis ~/.claude/skills/
cd ~/.claude/skills/keyapi-facebook-analysis && npm install
```

**OpenClaw** — copy to `~/.openclaw/skills/`:

```bash
cp -r keyapi-facebook-analysis ~/.openclaw/skills/
cd ~/.openclaw/skills/keyapi-facebook-analysis && npm install
```

**API token** — required on first run. Get yours at [keyapi.ai](https://keyapi.ai/):

```bash
# Option A: environment variable (current session only)
export KEYAPI_TOKEN=your_token_here

# Option B: .env file in the skill directory (persists across sessions)
echo "KEYAPI_TOKEN=your_token_here" > ~/.claude/skills/keyapi-facebook-analysis/.env
```

> If `KEYAPI_TOKEN` is not set and you run the script in a terminal, you will be prompted to enter it and it will be saved to `.env` automatically.

## Quick Start

```bash
# Verify connection
cd keyapi-facebook-analysis
node scripts/run.js --platform facebook --list-tools
```

## Common Rules

- **Profile ID resolution**: `profile_posts`, `profiles_photos`, `profiles_details_by_id` require numeric `profile_id` — use `get_profile_id` to resolve from URL
- **`profile_reels` identifier**: Requires `reels_profile_id` (base64 collection ID from profile details response), NOT the numeric `profile_id`
- **Group ID resolution**: `get_group_posts` and `get_group_future_events` require numeric `group_id` — use `get_group_id` to resolve from URL
- **Public content only**: All endpoints return data from public profiles, pages, and groups only
- **Cursor pagination**: All paginated endpoints use `cursor` from the previous response
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
