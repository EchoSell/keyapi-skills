# Scenarios

Use these scenario cards to map user intent to documentation search terms and reference modules. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

queries, images, videos, places, maps, reviews, news, shopping results, Lens URLs, scholar results, patents, webpages

## Common Scenarios

- Google Search and Extraction: web search, vertical search, visual search, local places, reviews, suggestions, and webpage extraction.

## Scenario Modules

Load this module after identifying a Google search or extraction workflow:

| User intent | Reference module | Docs path family |
|---|---|---|
| Web, news, shopping, scholar, patents, images, videos, Lens, places, maps, reviews, autocomplete, webpage extraction | `google-search-extraction-rules.md` | `/google/` |

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `google` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested Google surface.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose search, vertical, place/review, and webpage extraction workflows only when the docs support them.
5. Use scenario modules as curated endpoint shortlists, but verify current endpoint contracts from the linked docs page before execution.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, extraction, discovery, comparison, monitoring, or report
- Entity: queries, images, videos, places, maps, reviews, news, shopping results, Lens URLs, scholar results, patents, webpages
- Scope: query, result surface, country, language, location, time filter, page depth, and source type
- Sort or metric: relevance, freshness, location proximity, rating, review count, result type, source authority
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
