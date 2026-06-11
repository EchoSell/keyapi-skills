# Scenarios

Use these scenario cards to map user intent to documentation search terms. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

users, pins, boards, followers, following, usernames

## Common Scenarios

- Search Pinterest users by keyword
- Inspect user profile information
- Collect pins for a user or board
- Browse board collections
- Analyze follower/following networks

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `pinterest` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking/trend, resolver, and related-entity endpoints only when the docs support them.
5. For freshness-sensitive requests, search for docs terms such as `latest`, `recent`, `current`, `trend`, or `realtime` only when those variants exist for Pinterest.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: users, pins, boards, followers, following, usernames
- Scope: user, board, pin URL or ID, keyword, topic, follower/following graph, and board context
- Sort or metric: relevance, recency, saves or repins when available, follower count, board size, pin volume
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
