# Scenarios

Use these scenario cards to map user intent to documentation search terms. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

profiles, pages, groups, posts, photos, reels, events, profile IDs, group IDs

## Common Scenarios

- Resolve a profile or group URL into an ID
- Inspect public profile or page details
- Collect public profile/page posts, photos, or reels
- Analyze public group metadata, posts, and events
- Build a public activity summary for a profile/page/group

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `facebook` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking/trend, resolver, and related-entity endpoints only when the docs support them.
5. For freshness-sensitive requests, search for docs terms such as `latest`, `recent`, `current`, `trend`, or `realtime` only when those variants exist for Facebook.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: profiles, pages, groups, posts, photos, reels, events, profile IDs, group IDs
- Scope: profile/page/group URL or ID, keyword, content type, date window, public activity surface, and event context
- Sort or metric: recency, reactions, comments, shares, media type, page/group activity, event timing
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
