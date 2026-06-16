# Scenarios

Use these scenario cards to map user intent to documentation search terms and reference modules. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

products, categories, sellers, reviews, deals, offers, influencers, ASINs, GTINs

## Common Scenarios

- Amazon Product: product search, details, categories, best sellers, deals, offers, reviews, promo codes, and ASIN/GTIN conversion.
- Amazon Seller: seller profile, seller catalog, seller reviews, and product offer comparison.
- Amazon Influencer: influencer storefront profile, posts, list posts, and featured products.

## Scenario Modules

Load one of these modules after identifying the user's business goal:

| User intent | Reference module | Docs path family |
|---|---|---|
| Product discovery, categories, rankings, deals, offers, reviews, promo codes, ASIN/GTIN conversion | `amazon-product-rules.md` | `/amazon/` |
| Seller profile, seller products, seller reviews, offer comparison | `amazon-seller-rules.md` | `/amazon/` |
| Influencer storefronts, influencer posts, featured post products | `amazon-influencer-rules.md` | `/amazon/` |

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `amazon` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking, resolver, and related-entity endpoints only when the docs support them.
5. Use scenario modules as curated endpoint shortlists, but verify current endpoint contracts from the linked docs page before execution.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: products, categories, sellers, reviews, deals, offers, influencers, ASINs, GTINs
- Scope: marketplace or country, category, query, ASIN/GTIN, seller, price/rating/review filters, and availability constraints
- Sort or metric: sales rank, price, rating, review count, discount, availability, seller count, best-seller position
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
