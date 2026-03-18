# Reddit Skills — KeyAPI

Two AI agent skills for comprehensive Reddit data analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-reddit-content-analytics](keyapi-reddit-content-analytics/SKILL.md) | Explore and analyze Reddit posts, comments, and feeds | 14 nodes — single/batch post details, comment threads, sub-comments, user posts/comments, home/popular/games/news/subreddit feeds, community highlights |
| [keyapi-reddit-user-analysis](keyapi-reddit-user-analysis/SKILL.md) | Discover and analyze Reddit users and subreddits | 11 nodes — user profiles, active subreddits, trophies, subreddit rules/settings/channels, dynamic search, trending searches |

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
cp -r keyapi-reddit-content-analytics ~/.claude/skills/
cd ~/.claude/skills/keyapi-reddit-content-analytics && npm install
```

**OpenClaw** — copy to `~/.openclaw/skills/`:

```bash
cp -r keyapi-reddit-content-analytics ~/.openclaw/skills/
cd ~/.openclaw/skills/keyapi-reddit-content-analytics && npm install
```

**API token** — required on first run. Get yours at [keyapi.ai](https://keyapi.ai/):

```bash
# Option A: environment variable (current session only)
export KEYAPI_TOKEN=your_token_here

# Option B: .env file in the skill directory (persists across sessions)
echo "KEYAPI_TOKEN=your_token_here" > ~/.claude/skills/keyapi-reddit-content-analytics/.env
```

> If `KEYAPI_TOKEN` is not set and you run the script in a terminal, you will be prompted to enter it and it will be saved to `.env` automatically.

## Quick Start

Each skill is self-contained. Install a single skill or use both together.

```bash
# Verify connection
cd keyapi-reddit-content-analytics
node scripts/run.js --platform reddit --list-tools
```

## Common Rules

All Reddit skills share these rules:

- **ID prefixes**: Post IDs require `t3_` prefix (e.g., `t3_1ojnh50`); comment IDs require `t1_` prefix (e.g., `t1_abcd123`) — mandatory, bare IDs will fail
- **Batch limits**: `fetch_reddit_post_details_in_batch_max_5` accepts max 5 IDs; `fetch_reddit_post_details_in_large_batch_max_30` accepts max 30
- **Sub-comment traversal**: When a comment has `more.cursor`, call `fetch_reddit_app_comment_replies_sub-comments` with that cursor
- **Subreddit identifiers**: `subreddit_name` for info/rules/channels; `subreddit_id` for settings/mute/highlights
- **Pagination**: Feed and search endpoints use `after` cursor; sub-comments use `cursor` from `more.cursor`
- **`need_format`**: Optional boolean on most endpoints — set `true` for sanitized output
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
