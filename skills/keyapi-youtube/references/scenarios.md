# Scenarios

Use these scenario cards to map user intent to documentation search terms. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

videos, comments, sub-comments, streams, related videos, shorts, channels, channel IDs, channel URLs, suggestions, trending videos

## Common Scenarios

- Inspect video metadata, engagement, streams, and related videos
- Analyze comments and nested replies
- Search videos, Shorts, or trending videos
- Resolve channel ID, URL, handle, and description
- Collect channel videos and search within YouTube channels

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `youtube` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking/trend, resolver, and related-entity endpoints only when the docs support them.
5. For freshness-sensitive requests, search for docs terms such as `latest`, `recent`, `current`, `trend`, or `realtime` only when those variants exist for YouTube.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: videos, comments, sub-comments, streams, related videos, shorts, channels, channel IDs, channel URLs, suggestions, trending videos
- Scope: video/channel URL or ID, keyword, region, language, category, publish window, comment scope, and continuation depth
- Sort or metric: views, likes, comments, publish date, subscriber count, duration, relevance, trend position
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
