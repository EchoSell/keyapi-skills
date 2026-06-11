# Scenarios

Use these scenario cards to map user intent to documentation search terms. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

users, profiles, posts, reposts, replies, comments, search keywords

## Common Scenarios

- Resolve and inspect a Threads user
- Collect user posts, reposts, and replies
- Fetch post details and comments
- Search top or recent content by keyword
- Search user profiles by keyword

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `threads` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking/trend, resolver, and related-entity endpoints only when the docs support them.
5. For freshness-sensitive requests, search for docs terms such as `latest`, `recent`, `current`, `trend`, or `realtime` only when those variants exist for Threads.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: users, profiles, posts, reposts, replies, comments, search keywords
- Scope: username/user ID, post URL or ID, keyword, top/recent/profile search mode, reply/repost context, and date window
- Sort or metric: recency, replies, likes, reposts, discussion context, author relevance
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
