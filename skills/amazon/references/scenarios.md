# Scenarios

Use these scenario cards to map user intent to documentation search terms. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

products, categories, sellers, reviews, deals, offers, influencers, ASINs, GTINs

## Common Scenarios

- Product discovery and competitive comparison
- Category and best-seller monitoring
- Seller profile and seller review analysis
- Customer review and offer analysis
- Influencer storefront research
- Identifier conversion between ASIN and GTIN

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `amazon` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking/trend, resolver, and related-entity endpoints only when the docs support them.
5. For freshness-sensitive requests, search for docs terms such as `latest`, `recent`, `current`, `trend`, or `realtime` only when those variants exist for Amazon.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: products, categories, sellers, reviews, deals, offers, influencers, ASINs, GTINs
- Scope: marketplace or country, category, query, ASIN/GTIN, seller, price/rating/review filters, and availability constraints
- Sort or metric: sales rank, price, rating, review count, discount, availability, seller count, best-seller position
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
