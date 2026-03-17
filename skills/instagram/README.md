# Instagram Skills — KeyAPI

Two AI agent skills for comprehensive Instagram data analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-instagram-user-analysis](keyapi-instagram-user-analysis/SKILL.md) | Discover and analyze Instagram users | 14 nodes — profile, posts, Reels, Stories, Highlights, followers, following, tagged posts, reposts, similar users |
| [keyapi-instagram-content-discovery](keyapi-instagram-content-discovery/SKILL.md) | Explore Instagram content at scale | 20 nodes — posts, comments, hashtags, music, Explore page, locations, search |

## Quick Start

Each skill is self-contained. Install a single skill or use both together.

```bash
# Install a single skill (standalone mode)
cd keyapi-instagram-user-analysis
npm install
export KEYAPI_TOKEN=your_token_here
node scripts/run.js --platform instagram --list-tools
```

## Common Rules

All Instagram skills share these rules:

- **Pagination**: Token-based (`pagination_token`, `end_cursor`, `max_id`) — not numeric page numbers
- **User identification**: Most endpoints accept `username` or `user_id` — pass one, not both
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
- **No cover image conversion**: Instagram images are served directly — no proxy conversion needed
