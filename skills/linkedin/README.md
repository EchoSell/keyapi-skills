# LinkedIn Skills — KeyAPI

Two AI agent skills for comprehensive LinkedIn data analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-linkedin-user-analytics](keyapi-linkedin-user-analytics/SKILL.md) | Discover and analyze LinkedIn professionals | 18 nodes — profile, contact, posts, comments, videos, experience, skills, education, certifications, publications, honors, recommendations, interests, people search |
| [keyapi-linkedin-company-analysis](keyapi-linkedin-company-analysis/SKILL.md) | Explore and analyze LinkedIn companies | 6 nodes — company profile, employees, posts, job listings, job count, job detail |

## Quick Start

Each skill is self-contained. Install a single skill or use both together.

```bash
# Install a single skill (standalone mode)
cd keyapi-linkedin-user-analytics
npm install
export KEYAPI_TOKEN=your_token_here
node scripts/run.js --platform linkedin --list-tools
```

## Common Rules

All LinkedIn skills share these rules:

- **Identifier types**: Users have `username` (profile URL slug) and `urn` (opaque internal ID) — call `get_user_profile` first to obtain the `urn`. Companies have `company` (URL slug) and `company_id` — call `get_company_profile` first to obtain the `company_id`.
- **Pagination**: List endpoints use `page` (1-indexed) + optional `pagination_token` for content endpoints
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
