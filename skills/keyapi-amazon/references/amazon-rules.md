# Amazon Rules

## Entity Scope

products, categories, sellers, reviews, deals, offers, influencers, ASINs, GTINs

## Platform-Specific Rules

- Marketplace parameters usually use country or marketplace codes; confirm the current enum in docs.
- Batch product detail and offer endpoints may have per-call ASIN limits; verify limits from the current endpoint docs.
- For review workflows, preserve star rating, verified purchase, sort, and pagination filters when available.

## Scenario Module Routing

- Use `amazon-product-rules.md` for product search, detail, categories, best sellers, deals, offers, reviews, promo codes, and ASIN/GTIN conversion.
- Use `amazon-seller-rules.md` for seller profile, seller products, seller reviews, and offer comparison workflows.
- Use `amazon-influencer-rules.md` for Amazon Influencer profile, posts, and featured post products.
- If a request spans multiple modules, load the smallest set of scenario modules needed and confirm report scope before broad multi-endpoint execution.

## Documentation Hints

- Filter `https://docs.keyapi.ai/llms.txt` for links under `https://docs.keyapi.ai/amazon/`.
- Treat endpoint titles as hints, not stable tool names.
- Extract the current REST method and path from the OpenAPI block on the docs page.
- Use examples from the docs page only after replacing sample identifiers with user-provided or resolved identifiers.

## Output Guidance

- For discovery tasks, return ranked candidates with key evidence and next-step enrichment suggestions.
- For detail tasks, return a compact entity profile plus important raw identifiers.
- For trend/ranking tasks, state the metric, time window, market, and any API coverage limitations.
- For reports, organize findings by entity, performance signals, risks, and recommended follow-up calls.
