# Scenarios

Use these scenario cards to map user intent to documentation search terms and reference modules. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

posts, comments, sub-comments, users, subreddits, feeds, rules, settings, channels, trophies, communities, search results

## Common Scenarios

- Reddit Post and Comment: post detail, batch post detail, post comments, comment replies, user posts, and user comments.
- Reddit Community: subreddit info, feed, highlights, rules/style, settings, post channels, muted status, and active communities.
- Reddit Discovery: dynamic search, typeahead, trending searches, app feeds, user profile, and public trophies.

## Scenario Modules

Load one of these modules after identifying the user's business goal:

| User intent | Reference module | Docs path family |
|---|---|---|
| Post detail, batch detail, post comments, sub-comments, user posts, user comments | `reddit-post-comment-rules.md` | `/reddit/` |
| Subreddit info, subreddit feed, rules/style, settings, channels, highlights, muted status, active subreddits | `reddit-community-rules.md` | `/reddit/` |
| Dynamic search, typeahead, trending searches, popular/home/news/games feeds, user profile, trophies | `reddit-discovery-rules.md` | `/reddit/` |

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `reddit` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested post, community, user, feed, or search workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from discovery, detail, comments, community, and user endpoints only when the docs support them.
5. Use scenario modules as curated endpoint shortlists, but verify current endpoint contracts from the linked docs page before execution.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, thread traversal, community analysis, trend monitoring, user review, or report
- Entity: posts, comments, sub-comments, users, subreddits, feeds, rules, settings, channels, trophies, communities, search results
- Scope: post ID, comment ID, username, subreddit, feed type, search query, batch size, and pagination depth
- Sort or metric: relevance, recency, popularity, feed surface, comment depth, or community scope when supported
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
