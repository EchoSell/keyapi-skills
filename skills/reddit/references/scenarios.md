# Scenarios

Use these scenario cards to map user intent to documentation search terms. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

posts, comments, sub-comments, users, subreddits, feeds, rules, settings, channels, trophies, communities, search results

## Common Scenarios

- Fetch single or batch post details
- Traverse comments and nested replies
- Analyze user posts, comments, trophies, and active communities
- Inspect subreddit info, rules, settings, and channels
- Monitor feeds, dynamic search, typeahead, and trending searches

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `reddit` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description both match the entity family.
3. If multiple pages match, choose the one with the narrowest endpoint that satisfies the user request.
4. For broad reports, compose a small workflow from detail, list/search, trend/ranking, and related-entity endpoints.
5. For freshness-sensitive requests, prefer pages that describe realtime/current lookup when available.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, ranking, comparison, monitoring, report
- Entity: posts, comments, sub-comments, users, subreddits, feeds, rules, settings, channels, trophies, communities, search results
- Scope: country/region/language/date/category/query as applicable
- Sort or metric: newest, top, relevance, sales, growth, engagement, rating, comments, views
- Pagination depth: one page, top N, all available, or until enough evidence
- Output format: raw JSON, table, concise summary, or report
