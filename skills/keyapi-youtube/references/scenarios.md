# Scenarios

Use these scenario cards to map user intent to documentation search terms and reference modules. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

videos, comments, sub-comments, streams, related videos, shorts, channels, channel IDs, channel URLs, suggestions, trending videos

## Common Scenarios

- YouTube Video: video information, comments, sub-comments, related videos, streams info, and Shorts search.
- YouTube Channel: channel search, channel ID/URL conversion, channel description, and channel videos.
- YouTube Search and Trends: video search, general filtered search, search suggestions, trending videos, and query-led channel search.

## Scenario Modules

Load one of these modules after identifying the user's business goal:

| User intent | Reference module | Docs path family |
|---|---|---|
| Video detail, comments, sub-comments, related videos, stream/playback formats, Shorts search | `youtube-video-rules.md` | `/youtube/` |
| Channel search, channel ID/URL/handle conversion, channel description, channel videos | `youtube-channel-rules.md` | `/youtube/` |
| Video search, general filtered search, suggestions, trending videos, query-led channel discovery | `youtube-search-trends-rules.md` | `/youtube/` |

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `youtube` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested video, channel, search, trend, or comment workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from search, channel, video, comment, and related-video endpoints only when the docs support them.
5. Use scenario modules as curated endpoint shortlists, but verify current endpoint contracts from the linked docs page before execution.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, channel lookup, comment review, trend monitoring, media inspection, or report
- Entity: videos, comments, sub-comments, streams, related videos, shorts, channels, channel IDs, channel URLs, suggestions, trending videos
- Scope: video ID/URL, channel ID/URL/handle, query, filters, region/category, continuation token, and pagination depth
- Sort or metric: relevance, upload time, duration, content type, feature filter, trend surface, or continuation order when supported
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
