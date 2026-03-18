# Threads Skills — KeyAPI

One AI agent skill for comprehensive Threads data analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-threads-user-discovery](keyapi-threads-user-discovery/SKILL.md) | Discover and analyze Threads users and content | 10 nodes — user profile by username or ID, posts, reposts, replies, post detail, post comments, search top/recent content, search profiles |

## Quick Start

Each skill is self-contained.

```bash
# Install the skill
cd keyapi-threads-user-discovery
npm install
export KEYAPI_TOKEN=your_token_here
node scripts/run.js --platform threads --list-tools
```

## Common Rules

- **Identifier types**: `username` for `get_user_info`; `user_id` (numeric) for all content endpoints — call `get_user_info` first to resolve
- **`get_post_detail`**: Accepts shortcode (`post_id`) or full URL (`url`) — pass one, not both
- **Pagination**: Cursor-based via `end_cursor` — omit for first call, pass from previous response for subsequent pages
- **`search_profiles`**: No pagination — returns all results in a single call
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
