# TikTok Shop Module Rules

## 1. Module Scope

Use this module for TikTok Shop product, seller, shop, category, review, image search, product creator, product video, livestream, ranking, and commerce trend workflows. Typical examples include:

- discovering winning TikTok Shop products or sellers
- resolving product IDs from share links
- analyzing product detail, price, reviews, creators, videos, live sessions, and trends
- analyzing shop profile, products, creators, videos, livestreams, rankings, and trends
- resolving category hierarchy before category-sensitive analytics
- searching products by keyword or image

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Get Product ID From Share Link

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-id.md`
- Purpose: resolve a TikTok Shop product share link into a product ID.
- Best suited for:
  - starting from a product URL
  - preparing product detail, reviews, creators, videos, livestreams, or trend calls
  - avoiding manual URL parsing

### Rules

- Use this first when the user provides a product link instead of a product ID.
- Preserve the resolved product ID exactly for downstream calls.

## 3. Product Search

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-search.md`
- Purpose: search current TikTok Shop products by keyword.
- Best suited for:
  - realtime product lookup
  - finding candidate products by name or keyword
  - checking current product search visibility

### Rules

- Use for current keyword search.
- For analytics filters, rankings, sales, GMV, or historical metrics, use analytics product endpoints.

## 4. Product List (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-list-analytics.md`
- Purpose: retrieve filtered product lists with analytics fields.
- Best suited for:
  - product discovery with category, market, sales, GMV, review, or date filters
  - building a shortlist of products for deeper analysis
  - comparing products at scale

### Rules

- Use this first for "find products" requests that include performance criteria.
- Apply API-side filters from the docs where possible.
- Enrich shortlisted products with detail, trends, reviews, creators, videos, and livestreams.

## 5. Get Product Detail

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-detail.md`
- Purpose: retrieve current product detail.
- Best suited for:
  - current title, price, rating, shop, inventory, or product status checks
  - validating a known product ID
  - basic product profile reporting

### Rules

- Use for current product state.
- If the user needs app-style fields, SKU, logistics, or richer shopping context, consider `Product Detail (App)`.
- If the user needs historical performance or sales analytics, use `Product Detail (Analytics)`.

## 6. Product Detail (App)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-detail-app.md`
- Purpose: retrieve app-oriented product detail fields.
- Best suited for:
  - SKU, logistics, seller, recommendation, or shopping-layout data
  - matching the TikTok app product experience
  - validating fields not present in the basic realtime detail response

### Rules

- Use when the user asks about app-visible product details or SKU/logistics-style fields.
- Keep app detail separate from analytics performance data.

## 7. Product Detail (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-detail-analytics.md`
- Purpose: retrieve analytics-enriched product detail.
- Best suited for:
  - product performance reports
  - historical sales, GMV, creator, or video context
  - commerce validation of a product opportunity

### Rules

- Use when the user asks about sales, GMV, historical performance, or analytics detail.
- Combine with realtime detail when current price, inventory, or product status also matters.

## 8. Product Trends (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-trends-analytics.md`
- Purpose: retrieve product performance trends over time.
- Best suited for:
  - sales or GMV trend analysis
  - checking whether demand is rising or fading
  - campaign or launch performance monitoring

### Rules

- Use for time-series product questions.
- State date range and metrics from the response.
- Do not substitute static detail fields for a trend request.

## 9. Product Ranking (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-ranking-analytics.md`
- Purpose: retrieve ranked product lists.
- Best suited for:
  - top product leaderboards
  - category ranking checks
  - market comparison by supported ranking metrics

### Rules

- Use when the user asks for top, best, ranking, leaderboard, or category winners.
- State ranking metric, category, market, and time window when available.

## 10. Product Reviews

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-reviews.md`
- Purpose: retrieve current customer reviews for a product.
- Best suited for:
  - review sampling
  - customer complaint or praise analysis
  - product quality checks

### Rules

- Use when the user asks for actual reviews or review text.
- Preserve pagination for additional review pages.

## 11. Product Reviews (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-reviews-analytics.md`
- Purpose: retrieve analytics-oriented review data.
- Best suited for:
  - review distribution analysis
  - historical or aggregated review checks
  - product quality summaries

### Rules

- Use when the user asks for review metrics, distribution, or aggregate review insight.
- Use realtime reviews when the user needs review examples.

## 12. Product Creators (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-creators-analytics.md`
- Purpose: retrieve creators associated with a product.
- Best suited for:
  - finding who promoted a product
  - creator-product relationship analysis
  - outreach or competitor creator mapping

### Rules

- Use after product resolution.
- Enrich selected creators through Influencer or Shop Creator modules as needed.

## 13. Product Videos (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-videos-analytics.md`
- Purpose: retrieve videos associated with a product.
- Best suited for:
  - creative analysis for a product
  - identifying product promotion videos
  - checking video-driven product performance

### Rules

- Use when the user asks for videos selling or featuring a product.
- Enrich selected videos through content detail, comments, captions, and trends.

## 14. Product Livestreams (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-livestreams-analytics.md`
- Purpose: retrieve livestreams associated with a product.
- Best suited for:
  - live commerce analysis
  - identifying live sessions that promoted a product
  - comparing live-driven sales contribution

### Rules

- Use when the user asks about live selling or live sessions for a product.
- For active live detail, route selected live identifiers to content live detail when applicable.

## 15. Product Image Search (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-image-search-analytics.md`
- Purpose: search for visually similar products in analytics data.
- Best suited for:
  - image-led product discovery
  - finding similar products with commerce metrics
  - competitor product matching by image

### Rules

- Use when the user has an image and wants analytics-backed product matches.
- Preserve image search identifiers or tokens returned by the API for follow-up when documented.

## 16. Product Image Search

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-photo-search.md`
- Purpose: run realtime product image search.
- Best suited for:
  - first-pass image search
  - matching a product photo to current TikTok Shop products
  - obtaining tokens needed for paginated image-search follow-up

### Rules

- Use this first for realtime image search.
- For large base64 image payloads, prefer `scripts/keyapi-api.mjs --image-file ./image.jpg --image-field image_base64` or `--body-file request.json` instead of inline `--body`.
- Preserve returned `image_uri`, `box_detection`, or equivalent tokens exactly when present.

## 17. Product Image Search Page

- Documentation: `https://docs.keyapi.ai/tiktok/shop/product-photo-search-page.md`
- Purpose: retrieve follow-up pages for realtime product image search.
- Best suited for:
  - continuing image search results
  - paginated product matching
  - expanding the initial realtime image result set

### Rules

- Use only after the first realtime image search returns the required paging or image tokens.
- Do not invent paging values; copy them from the API response.

## 18. Primary Categories (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/category-primary-analytics.md`
- Purpose: retrieve primary TikTok Shop categories.
- Best suited for:
  - broad category discovery
  - resolving category IDs before analytics product or ranking calls
  - helping users choose category filters

### Rules

- Use first when a category-sensitive request starts from a broad category name.
- Preserve category IDs for secondary category lookup and analytics filters.

## 19. Secondary Categories (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/category-secondary-analytics.md`
- Purpose: retrieve secondary categories under a primary category.
- Best suited for:
  - narrowing broad category filters
  - preparing more precise product list or ranking queries
  - category hierarchy exploration

### Rules

- Use after a primary category is known.
- Preserve parent-child category relationships in the answer.

## 20. Tertiary Categories (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/category-tertiary-analytics.md`
- Purpose: retrieve tertiary categories under a secondary category.
- Best suited for:
  - fine-grained product filtering
  - category-specific competitive analysis
  - precise ranking or product list queries

### Rules

- Use after primary and secondary category IDs are known.
- Do not skip hierarchy resolution when the docs require parent category IDs.

## 21. Shop List (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-list-analytics.md`
- Purpose: retrieve filtered shop or seller lists with analytics fields.
- Best suited for:
  - seller discovery
  - finding top shops by category, market, GMV, sales, or product count
  - building a seller shortlist

### Rules

- Use first when the user asks to find shops or sellers with criteria.
- Enrich selected shops with shop detail, products, creators, videos, livestreams, ranking, or trends.

## 22. Shop Detail (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-detail-analytics.md`
- Purpose: retrieve analytics detail for a shop.
- Best suited for:
  - seller profile reports
  - shop GMV, product, creator, video, or live performance checks
  - validating a shop selected from search, ranking, or product detail

### Rules

- Use after a shop identifier is known.
- Combine with realtime shop products when current listings matter.

## 23. Get Shop Products

- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-products.md`
- Purpose: retrieve current product listings for a shop.
- Best suited for:
  - current shop assortment checks
  - listing visible products from a seller
  - validating current availability

### Rules

- Use for realtime shop product state.
- For historical product performance, use `Shop Products (Analytics)`.

## 24. Shop Products (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-products-analytics.md`
- Purpose: retrieve analytics-enriched products for a shop.
- Best suited for:
  - shop portfolio analysis
  - identifying best-performing products in a shop
  - comparing sales, GMV, or trend signals across a seller's products

### Rules

- Use when product performance inside a shop matters.
- Enrich selected products with product detail, trends, reviews, creators, videos, or livestreams.

## 25. Shop Creators (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-creators-analytics.md`
- Purpose: retrieve creators associated with a shop.
- Best suited for:
  - shop affiliate or creator ecosystem analysis
  - identifying which creators drive shop visibility or sales
  - creator sourcing for a seller

### Rules

- Use after shop resolution.
- Enrich selected creators through Influencer or Shop Creator modules.

## 26. Shop Videos (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-videos-analytics.md`
- Purpose: retrieve videos associated with a shop.
- Best suited for:
  - shop creative analysis
  - identifying product promotion videos for a seller
  - video-driven shop performance review

### Rules

- Use when the user asks for a shop's videos or content performance.
- Enrich selected videos through Content endpoints.

## 27. Shop Livestreams (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-livestreams-analytics.md`
- Purpose: retrieve livestreams associated with a shop.
- Best suited for:
  - seller live commerce analysis
  - finding historical live sessions for a shop
  - comparing live performance across sellers

### Rules

- Use when the user asks about live sessions or live selling for a shop.
- For current live room detail, route selected live IDs to content live detail when applicable.

## 28. Shop Ranking (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-ranking-analytics.md`
- Purpose: retrieve ranked shop lists.
- Best suited for:
  - top seller leaderboards
  - GMV, sales, product count, or category shop rankings
  - competitive seller benchmarking

### Rules

- Use when the user asks for top shops, seller rankings, or leaderboards.
- State ranking metric, category, market, and time window when available.

## 29. Shop Trends (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/shop/shop-trends-analytics.md`
- Purpose: retrieve shop performance trends over time.
- Best suited for:
  - seller growth analysis
  - GMV, sales, product count, or content trend checks
  - monitoring shop momentum

### Rules

- Use for time-series shop questions.
- Explain trend direction using returned metrics and dates.

## 30. Common Workflows

- Product from link: `Get Product ID From Share Link` -> `Get Product Detail` -> analytics detail/trends/reviews as needed.
- Product discovery: `Product List (Analytics)` or `Product Ranking (Analytics)` -> detail selected products.
- Product opportunity: detail -> trends -> reviews -> creators -> videos -> livestreams.
- Image-led discovery: `Product Image Search` -> `Product Image Search Page`; use analytics image search when commerce metrics are required.
- Category-sensitive discovery: primary category -> secondary category -> tertiary category -> product list or ranking.
- Shop report: `Shop Detail (Analytics)` -> shop products -> creators -> videos -> livestreams -> trends.
