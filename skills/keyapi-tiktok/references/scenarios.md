# Scenarios

Use these scenario cards to map user intent to documentation search terms. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

influencers, shop creators, products, shops, categories, videos, hashtags, music, comments, live rooms, ads, trends, audiences

## Common Scenarios

- Find and benchmark creators or shop creators
- Analyze creator profile, growth, videos, products, live history, audience, and rankings
- Research TikTok Shop products, shops, categories, reviews, related creators, videos, and live sessions
- Analyze videos, comments, hashtags, music, and live streams
- Monitor trending hashtags, music, videos, ads, products, and keyword insights

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `tiktok` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking/trend, resolver, and related-entity endpoints only when the docs support them.
5. For freshness-sensitive requests, search for docs terms such as `latest`, `recent`, `current`, `trend`, or `realtime` only when those variants exist for TikTok.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: influencers, shop creators, products, shops, categories, videos, hashtags, music, comments, live rooms, ads, trends, audiences
- Scope: country/region, category, keyword, creator/product/shop/video/hashtag/music/live identifier, and date window
- Sort or metric: GMV, sales, views, likes, comments, shares, engagement rate, follower growth, ranking position
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
