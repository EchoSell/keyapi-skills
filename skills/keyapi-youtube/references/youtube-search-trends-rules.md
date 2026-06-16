# YouTube Search And Trends Module Rules

## 1. Module Scope

Use this module for YouTube video search, general search with filters, search suggestions, trending videos, and channel search when the user's starting point is a query.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Video Search And General Search

- Documentation: `https://docs.keyapi.ai/youtube/search-video.md`
- Documentation: `https://docs.keyapi.ai/youtube/general-search-with-filters.md`
- Purpose: search YouTube videos or run filtered YouTube search.
- Best suited for topic research, filtered discovery, and collecting candidate videos.

### Rules

- Use filtered search when the user asks for upload time, duration, content type, features, or sort constraints.
- Enrich selected videos with video information and comments.

## 3. Search Suggestions

- Documentation: `https://docs.keyapi.ai/youtube/get-search-suggestions.md`
- Purpose: retrieve YouTube autocomplete suggestions.
- Best suited for keyword expansion, content ideation, and query planning.

### Rules

- Use before search when the user asks for keyword ideas or wants query expansion.
- Do not treat suggestions as search results.

## 4. Trending Videos

- Documentation: `https://docs.keyapi.ai/youtube/get-trending-videos.md`
- Purpose: retrieve trending YouTube videos.
- Best suited for trend monitoring and current popular video discovery.

### Rules

- Use when the user asks what is trending.
- State region/category/time context when available from docs or response.

## 5. Channel Search From Query

- Documentation: `https://docs.keyapi.ai/youtube/search-channel.md`
- Documentation: `https://docs.keyapi.ai/youtube/search-channels.md`
- Purpose: search YouTube channels from a user query.
- Best suited for creator/channel discovery before channel profile enrichment.

### Rules

- Use when the user asks to find channels rather than videos.
- Route selected channels to `youtube-channel-rules.md`.

## 6. Common Workflows

- Topic research: suggestions -> filtered/general/video search -> selected video detail.
- Trend report: trending videos -> video detail/comments for selected results.
- Channel discovery: channel search -> channel description/videos.
