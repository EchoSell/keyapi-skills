# Scenarios

Use these scenario cards to map user intent to documentation search terms and reference modules. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

users, profiles, posts, reposts, replies, comments, search keywords

## Common Scenarios

- Threads Social: profile search, user detail, user posts/replies/reposts, post detail, comments, top content search, and recent content search.

## Scenario Modules

Load this module after identifying a Threads workflow:

| User intent | Reference module | Docs path family |
|---|---|---|
| Profile search, user info, user posts/replies/reposts, post detail, comments, top/recent content search | `threads-social-rules.md` | `/threads/` |

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `threads` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested profile, post, comment, or search workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from search, user detail, post detail, and comments only when the docs support them.
5. Use scenario modules as curated endpoint shortlists, but verify current endpoint contracts from the linked docs page before execution.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: profile lookup, content search, post detail, comment review, activity review, or report
- Entity: users, profiles, posts, reposts, replies, comments, search keywords
- Scope: username, user ID, post shortcode/URL/ID, keyword, top/recent ordering, and pagination depth
- Sort or metric: top content, recent content, activity type, or engagement signal when supported
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
