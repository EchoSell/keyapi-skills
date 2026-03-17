# YouTube Skills — KeyAPI

Two AI agent skills for comprehensive YouTube data analysis, powered by the [KeyAPI](https://keyapi.ai/) MCP service. Compatible with Claude Code, OpenClaw, and any agent that supports the OpenClaw/Claude skill format.

## Skills in This Directory

| Skill | Primary Use Case | Key Nodes |
|-------|-----------------|-----------|
| [keyapi-youtube-video-analysis](keyapi-youtube-video-analysis/SKILL.md) | Analyze YouTube videos at depth | 8 nodes — video metadata, comments, sub-comments, stream formats, related videos, Shorts search, video search, trending |
| [keyapi-youtube-channel-analysis](keyapi-youtube-channel-analysis/SKILL.md) | Discover and analyze YouTube channels | 9 nodes — channel metadata, video library, ID/URL conversion, channel search, filtered search, suggestions |

## Quick Start

Each skill is self-contained. Install a single skill or use both together.

```bash
# Install a single skill (standalone mode)
cd keyapi-youtube-video-analysis
npm install
export KEYAPI_TOKEN=your_token_here
node scripts/run.js --platform youtube --list-tools
```

## Common Rules

All YouTube skills share these rules:

- **Pagination**: Token-based (`continuation_token`) — not numeric page numbers
- **Video ID extraction**: Extract from URL `youtube.com/watch?v=VIDEO_ID`
- **Channel ID format**: UC-format (24 chars starting with `UC`) required for some endpoints
- **Response check**: `code = 0` = success; retry up to 3 times on `code = 500`
- **Cache first**: Check `.keyapi-cache/` before every API call (date-scoped: `YYYY-MM-DD`)
- **No cover image conversion**: YouTube images are served directly — no proxy conversion needed
