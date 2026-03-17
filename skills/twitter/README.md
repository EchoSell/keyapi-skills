# Twitter Skills — KeyAPI

One AI agent skill for comprehensive Twitter/X data analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-twitter-content-analytics](keyapi-twitter-content-analytics/SKILL.md) | Explore and analyze Twitter/X content | 11 nodes — tweets, user profiles, posts, replies, media, comments, retweets, search, trending, followers, following |

## Quick Start

```bash
# Install the skill
cd keyapi-twitter-content-analytics
npm install
export KEYAPI_TOKEN=your_token_here
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
