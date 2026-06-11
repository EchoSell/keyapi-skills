# Scenarios

Use these scenario cards to map user intent to documentation search terms. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

tweets, threads, replies, profiles, users, timelines, media, trends, communities, lists, jobs, spaces, followers, following, retweets

## Common Scenarios

- Inspect a tweet, thread, replies, retweets, or media
- Analyze a user profile, timeline, followers, and following
- Search top/latest/media/people/list/community content
- Monitor trends by country or region
- Explore communities, lists, jobs, and Spaces

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `twitter` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking/trend, resolver, and related-entity endpoints only when the docs support them.
5. For freshness-sensitive requests, search for docs terms such as `latest`, `recent`, `current`, `trend`, or `realtime` only when those variants exist for Twitter / X.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: tweets, threads, replies, profiles, users, timelines, media, trends, communities, lists, jobs, spaces, followers, following, retweets
- Scope: handle/user ID, tweet URL or ID, keyword, list/community, media type, date window, and trend surface
- Sort or metric: recency, replies, reposts, likes, views when available, follower count, trend rank, conversation context
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
