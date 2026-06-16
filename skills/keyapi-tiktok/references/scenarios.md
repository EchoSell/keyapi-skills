# Scenarios

Use these scenario cards to map user intent to documentation search terms. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

influencers, shop creators, products, shops, categories, videos, hashtags, music, comments, live rooms, ads, trends, audiences

## Common Scenarios

- TikTok Influencer: find, benchmark, enrich, and report on TikTok influencers and creators.
- TikTok Shop Creator: resolve and analyze commerce creators, sales, audience, videos, and trends.
- TikTok Shop: research products, shops, sellers, categories, reviews, rankings, related creators, videos, and live sessions.
- TikTok Content: analyze videos, comments, replies, captions, hashtags, music, live streams, covers, and downloads.
- TikTok Intelligence: monitor trending videos, hashtags, music, ads, products, keyword insights, and market signals.

## Scenario Modules

Load one of these modules after identifying the user's business goal:

| User intent | Reference module | Docs path family |
|---|---|---|
| Influencer discovery, detail, ranking, trend, followers, videos, products, live history | `tiktok-influencer-rules.md` | `/tiktok/influencer/` |
| Shop creator lookup, sales, audience, videos, commerce trends | `tiktok-shop-creator-rules.md` | `/tiktok/shop-creator/` |
| Shop products, sellers, categories, reviews, rankings, image search, product/shop analysis | `tiktok-shop-rules.md` | `/tiktok/shop/` |
| Videos, comments, captions, hashtags, music, live streams, downloads, covers, content search | `tiktok-content-rules.md` | `/tiktok/content/` |
| Trends, viral videos, trending hashtags/music, ads, keyword insights, top product insights | `tiktok-intelligence-rules.md` | `/tiktok/intelligence/` |

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `tiktok` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking/trend, resolver, and related-entity endpoints only when the docs support them.
5. For freshness-sensitive requests, search for docs terms such as `latest`, `recent`, `current`, `trend`, or `realtime` only when those variants exist for TikTok.
6. Use scenario modules as curated endpoint shortlists, but verify current endpoint contracts from the linked docs page before execution.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: influencers, shop creators, products, shops, categories, videos, hashtags, music, comments, live rooms, ads, trends, audiences
- Scope: country/region, category, keyword, creator/product/shop/video/hashtag/music/live identifier, and date window
- Sort or metric: GMV, sales, views, likes, comments, shares, engagement rate, follower growth, ranking position
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
