# Scenarios

Use these scenario cards to map user intent to documentation search terms and reference modules. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

profiles, pages, groups, posts, photos, reels, events, profile IDs, group IDs

## Common Scenarios

- Facebook Public Data: public profile/page lookup, profile content, group lookup, group posts, and future group events.

## Scenario Modules

Load this module after identifying a Facebook public-data workflow:

| User intent | Reference module | Docs path family |
|---|---|---|
| Profile/page details, posts, photos, Reels, group details, group posts, group events, ID resolution | `facebook-public-data-rules.md` | `/facebook/` |

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `facebook` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from resolver, detail, and content endpoints only when the docs support them.
5. Use scenario modules as curated endpoint shortlists, but verify current endpoint contracts from the linked docs page before execution.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: resolver, detail, content lookup, monitoring, or report
- Entity: profiles, pages, groups, posts, photos, reels, events, profile IDs, group IDs
- Scope: profile URL, profile ID, group URL, group ID, public page/profile, content type, and pagination depth
- Sort or metric: recency, relevance, media type, or event date when supported
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
