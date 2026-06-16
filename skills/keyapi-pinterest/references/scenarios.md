# Scenarios

Use these scenario cards to map user intent to documentation search terms and reference modules. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

users, pins, boards, followers, following, usernames

## Common Scenarios

- Pinterest User and Board: user search, user profile, pins, boards, followers, and following.

## Scenario Modules

Load this module after identifying a Pinterest user, board, pin, or network workflow:

| User intent | Reference module | Docs path family |
|---|---|---|
| User search, user information, pins, boards, followers, following | `pinterest-user-board-rules.md` | `/pinterest/` |

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `pinterest` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose user, pins, boards, and network endpoints only when the docs support them.
5. Use scenario modules as curated endpoint shortlists, but verify current endpoint contracts from the linked docs page before execution.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: user lookup, content lookup, network traversal, comparison, or report
- Entity: users, pins, boards, followers, following, usernames
- Scope: username, user ID, board ID, pin scope, relationship type, and pagination depth
- Sort or metric: content recency, board grouping, follower/following relationship when supported
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
