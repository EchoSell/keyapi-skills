# TikTok Shop Creator Module Rules

## 1. Module Scope

Use this module for TikTok Shop creator commerce workflows. Typical examples include:

- resolving a TikTok creator into a Shop creator record
- checking a creator's Shop profile and sales performance
- finding creator sales products and promotion videos
- analyzing creator GMV, item sales, audience composition, and performance trends
- preparing creator selection reports for TikTok Shop collaboration

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Search Shop Creator

- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/search.md`
- Purpose: resolve a TikTok user or handle-like input into Shop creator records and downstream Shop creator identifiers.
- Best suited for:
  - starting from a TikTok username, unique ID, or creator keyword
  - finding the correct `creator_oecuid` before sales, videos, trends, audience, or detail calls
  - disambiguating similarly named creators

### Rules

- Use this first when the user does not provide the exact Shop creator identifier required by downstream endpoints.
- Preserve the returned creator identifiers exactly; downstream endpoints may not accept a plain TikTok handle.
- If multiple creators match, ask the user to choose or rank candidates using visible profile and commerce signals from the response.

## 3. Get Shop Creator Detail

- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/detail.md`
- Purpose: retrieve a Shop creator profile and high-level commerce performance fields.
- Best suited for:
  - quick creator profile checks
  - validating the selected Shop creator before a full report
  - summarizing creator identity, basic Shop metrics, and commerce status

### Rules

- Use after `Search Shop Creator` when the input is not already a valid Shop creator identifier.
- Treat this as the profile snapshot endpoint, not the full sales, video, audience, or trend report.
- For decisions about collaboration potential, enrich detail with sales, videos, trends, and audience.

## 4. Get Shop Creator Sales

- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/sales.md`
- Purpose: retrieve products or items sold or promoted by a Shop creator.
- Best suited for:
  - understanding what a creator sells
  - identifying best-selling promoted products
  - estimating product concentration and sales contribution
  - comparing creator-commerce fit across product categories

### Rules

- Use this when the user asks about sales, promoted products, GMV contribution, sold items, or product mix.
- Preserve product identifiers for enrichment through `tiktok-shop-rules.md`.
- Separate creator-level performance from product-level performance in the final answer.

## 5. Get Shop Creator Videos

- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/videos.md`
- Purpose: retrieve commerce videos associated with a Shop creator.
- Best suited for:
  - finding product promotion videos
  - checking which videos drive sales or engagement
  - reviewing creative style for creator selection
  - linking video performance back to promoted products

### Rules

- Use this when the user asks for creator product videos, sales videos, or examples of promoted content.
- If video-level detail, comments, captions, or download URLs are needed, enrich selected videos through `tiktok-content-rules.md`.
- Do not use this endpoint for general non-commerce creator videos unless the docs confirm it covers the requested surface.

## 6. Get Shop Creator Trends

- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/trends.md`
- Purpose: retrieve time-series performance for a Shop creator.
- Best suited for:
  - growth and decline analysis
  - GMV, sales, follower, or view trend checks
  - campaign before/after comparisons
  - identifying stable versus spike-driven creators

### Rules

- Use this for historical or time-window questions, not for a static profile snapshot.
- State the date range, granularity, and metric names when available from the docs or response.
- Explain trend direction using returned data; avoid inferring causes unless supported by linked videos, products, or live sessions.

## 7. Get Shop Creator Audience

- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/audience.md`
- Purpose: retrieve audience or fan portrait data for a Shop creator.
- Best suited for:
  - audience demographic checks
  - brand fit evaluation
  - market and region fit analysis
  - comparing multiple creators by audience profile

### Rules

- Use only when audience composition, fan portrait, age, gender, region, or market fit is directly relevant.
- Keep audience data separate from creator profile and sales data.
- When coverage or sampling is unclear, describe the result as the API's available audience signal rather than an exhaustive census.

## 8. Common Workflows

- Creator lookup: `Search Shop Creator` -> `Get Shop Creator Detail`.
- Creator commerce report: `Search Shop Creator` -> `Detail` -> `Sales` -> `Videos` -> `Trends` -> `Audience`.
- Product fit report: `Sales` -> enrich selected products with TikTok Shop product detail, trends, reviews, creators, videos, and livestreams.
- Creative review: `Videos` -> enrich selected videos with content video detail, comments, captions, products, and trends.
