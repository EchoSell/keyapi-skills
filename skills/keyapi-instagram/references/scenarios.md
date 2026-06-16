# Scenarios

Use these scenario cards to map user intent to documentation search terms and reference modules. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

users, profiles, posts, reels, stories, highlights, followers, following, tags, reposts, comments, hashtags, music, places, locations

## Common Scenarios

- Instagram User: user search, profile detail, content lists, stories, highlights, relationship networks, related users, and similar users.
- Instagram Content: post detail, comments, replies, likes, hashtag posts, music posts, Reels, Explore, and shortcode/media ID conversion.
- Instagram Discovery: general search, hashtag search, music search, places, cities, and coordinate-based location search.

## Scenario Modules

Load one of these modules after identifying the user's business goal:

| User intent | Reference module | Docs path family |
|---|---|---|
| User lookup, profiles, followers/following, user posts/Reels/stories/highlights/tagged/reposts, related/similar users | `instagram-user-rules.md` | `/instagram/` |
| Post detail, comments, replies, likes, hashtag posts, music posts, Reels, Explore sections/posts, shortcode/media ID conversion | `instagram-content-rules.md` | `/instagram/` |
| General search, hashtag/music/place search, city lookup, coordinate location search | `instagram-discovery-rules.md` | `/instagram/` |

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `instagram` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from search, resolver, detail, content, and relationship endpoints only when the docs support them.
5. Use scenario modules as curated endpoint shortlists, but verify current endpoint contracts from the linked docs page before execution.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, content lookup, network traversal, comparison, monitoring, or report
- Entity: users, profiles, posts, reels, stories, highlights, followers, following, tags, reposts, comments, hashtags, music, places, locations
- Scope: username, user ID, shortcode, media ID, hashtag, music ID, place/location, country/city, and pagination depth
- Sort or metric: recency, media type, relationship type, section, location, or engagement signal when supported
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
