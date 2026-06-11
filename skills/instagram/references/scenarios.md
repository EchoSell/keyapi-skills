# Scenarios

Use these scenario cards to map user intent to documentation search terms. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

users, profiles, posts, reels, stories, highlights, followers, following, tags, reposts, comments, hashtags, music, places, locations

## Common Scenarios

- User profile and content library analysis
- Follower/following and related-user exploration
- Post, comment, like, and reply analysis
- Hashtag, Reel, music, Explore, and location discovery
- Shortcode/media ID conversion workflows

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `instagram` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking/trend, resolver, and related-entity endpoints only when the docs support them.
5. For freshness-sensitive requests, search for docs terms such as `latest`, `recent`, `current`, `trend`, or `realtime` only when those variants exist for Instagram.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: users, profiles, posts, reels, stories, highlights, followers, following, tags, reposts, comments, hashtags, music, places, locations
- Scope: username/user ID, post/Reel/Story/Highlight URL or ID, hashtag, music, location, language, and date window
- Sort or metric: recency, likes, comments, views, plays, follower fit, hashtag volume, creator similarity
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
