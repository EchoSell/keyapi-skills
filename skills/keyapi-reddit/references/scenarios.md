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
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking/trend, resolver, and related-entity endpoints only when the docs support them.
5. For freshness-sensitive requests, search for docs terms such as `latest`, `recent`, `current`, `trend`, or `realtime` only when those variants exist for Reddit.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: posts, comments, sub-comments, users, subreddits, feeds, rules, settings, channels, trophies, communities, search results
- Scope: subreddit, user, post URL or ID, comment ID, keyword, feed type, time window, and community context
- Sort or metric: score, comment count, recency, community fit, post type, thread depth, activity level
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
