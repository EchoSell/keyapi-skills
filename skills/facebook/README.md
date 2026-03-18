# Facebook Skills — KeyAPI

One AI agent skill for comprehensive public Facebook data analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-facebook-analysis](keyapi-facebook-analysis/SKILL.md) | Explore and analyze public Facebook profiles, pages, and groups | 10 nodes — profile details, posts, photos, Reels, group posts, group details, group events, ID resolution |

## Quick Start

```bash
cd keyapi-facebook-analysis
npm install
export KEYAPI_TOKEN=your_token_here
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
