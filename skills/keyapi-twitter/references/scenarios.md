# Scenarios

Use these scenario cards to map user intent to documentation search terms and reference modules. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

tweets, threads, replies, profiles, users, timelines, media, trends, communities, lists, jobs, spaces, followers, following, retweets

## Common Scenarios

- Twitter Profile and Social Graph: profile lookup, followers, following, affiliation, follow checks, retweets, media, and live workflows.
- Twitter Content and Search: tweet detail, tweet threads, timelines, replies, search, trends, inspiration posts, and jobs search.
- Twitter Community/List/Spaces: communities, community posts, community members, lists, list timelines, list members/followers, and Spaces.

## Scenario Modules

Load one of these modules after identifying the user's business goal:

| User intent | Reference module | Docs path family |
|---|---|---|
| User profile/about, batch profile IDs, followers, following, follow checks, affiliates, retweets, media, user live | `twitter-profile-social-rules.md` | `/twitter/` |
| Tweet info, tweet thread, user timeline, replies, search, trends, inspiration posts, jobs search | `twitter-content-rules.md` | `/twitter/` |
| Communities, community posts/search/members, lists, list timeline/members/followers, Spaces info | `twitter-community-rules.md` | `/twitter/` |

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `twitter` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested profile, tweet, search, community, list, job, or Spaces workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from profile, tweet, timeline, search, community, list, and social graph endpoints only when the docs support them.
5. Use scenario modules as curated endpoint shortlists, but verify current endpoint contracts from the linked docs page before execution.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, timeline review, relationship traversal, community/list monitoring, trend monitoring, or report
- Entity: tweets, threads, replies, profiles, users, timelines, media, trends, communities, lists, jobs, spaces, followers, following, retweets
- Scope: tweet ID, user ID/rest_id, screen name, list ID, community ID, Space ID, query, mode, and pagination depth
- Sort or metric: top/latest, trend rank, recency, relationship type, media type, or community/list surface when supported
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
