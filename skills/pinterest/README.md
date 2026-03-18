# Pinterest Skills — KeyAPI

One AI agent skill for comprehensive Pinterest user and content analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-pinterest-analysis](keyapi-pinterest-analysis/SKILL.md) | Discover and analyze Pinterest users, pins, boards, and social graphs | 6 nodes — user search, profile info, pins, boards, followers, following |

## Quick Start

```bash
cd keyapi-pinterest-analysis
npm install
export KEYAPI_TOKEN=your_token_here
node scripts/run.js --platform pinterest --list-tools
```

## Common Rules

- **`get_boards` uses `entry`**: Pass username as the `entry` parameter (not `username`)
- **`userid` resolution**: `get_followers_detail` and `get_following_detail` require numeric `userid` — obtain from `get_user_information` response
- **`get_followers_detail` pagination**: First call: `userid` only. Subsequent: `userid` + `node_id` + `cursor`
- **`get_following_detail` pagination**: Uses `bookmark` (not `cursor`) for pagination
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
