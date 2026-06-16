# TikTok Intelligence Module Rules

## 1. Module Scope

Use this module for market-level TikTok intelligence, trend discovery, ad insight, keyword insight, and top product research. Typical examples include:

- discovering trending videos, hashtags, and music
- checking details behind a specific trending hashtag or music track
- analyzing top ads and ad creatives
- finding keyword-level market opportunities
- identifying top products and validating market demand

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Trending Videos

- Documentation: `https://docs.keyapi.ai/tiktok/intelligence/trending-videos.md`
- Purpose: retrieve TikTok videos currently trending in the supported trend surface.
- Best suited for:
  - trend monitoring briefs
  - creative inspiration research
  - identifying viral content for later video-detail enrichment

### Rules

- Use this first when the user asks what videos are trending.
- Preserve returned video identifiers for content detail, comments, captions, products, and trend calls.
- State ranking criteria, market, category, and time window when they appear in docs or response.

## 3. Trending Hashtags

- Documentation: `https://docs.keyapi.ai/tiktok/intelligence/trending-hashtags.md`
- Purpose: retrieve currently trending hashtags.
- Best suited for:
  - hashtag trend discovery
  - campaign topic research
  - category or market trend monitoring

### Rules

- Use this before hashtag detail when the user asks broadly for trending tags.
- Enrich only selected hashtags with the detail endpoint.
- For regular keyword hashtag search, use `tiktok-content-rules.md` instead.

## 4. Trending Hashtag Detail

- Documentation: `https://docs.keyapi.ai/tiktok/intelligence/trending-hashtag-detail.md`
- Purpose: retrieve detailed trend information for one trending hashtag.
- Best suited for:
  - explaining why a hashtag matters
  - checking view trend, examples, or related content for a known hashtag
  - validating a hashtag selected from trending hashtag results

### Rules

- Use only after a specific hashtag is known.
- If the user needs videos under any hashtag, not just a trending detail view, use content hashtag videos when appropriate.
- Separate hashtag-level trend data from video-level evidence.

## 5. Trending Music

- Documentation: `https://docs.keyapi.ai/tiktok/intelligence/trending-music.md`
- Purpose: retrieve currently trending music tracks.
- Best suited for:
  - sound trend monitoring
  - shortlisting music for content strategy
  - finding audio signals behind viral formats

### Rules

- Use this first for broad trending music requests.
- Preserve music identifiers for `Trending Music Detail` or content music search workflows.
- Do not treat a music trend as product demand unless connected to commerce evidence.

## 6. Trending Music Detail

- Documentation: `https://docs.keyapi.ai/tiktok/intelligence/trending-music-detail.md`
- Purpose: retrieve detail for a specific trending music track.
- Best suited for:
  - checking track usage and examples
  - evaluating music trend momentum
  - enriching a selected trending music item

### Rules

- Use only after a specific music item is known.
- Enrich representative videos through content endpoints when the user needs examples, captions, comments, or product links.

## 7. Top Ads Insights

- Documentation: `https://docs.keyapi.ai/tiktok/intelligence/insights-ads.md`
- Purpose: retrieve top ad insights for TikTok ads or creatives.
- Best suited for:
  - competitor ad research
  - creative benchmarking
  - category ad monitoring
  - finding high-performing ad examples

### Rules

- Use this for broad ad insight lists.
- Preserve ad or creative identifiers for `Top Ad Insights Detail`.
- State filters such as market, category, objective, date range, or ranking metric when available.

## 8. Top Ad Insights Detail

- Documentation: `https://docs.keyapi.ai/tiktok/intelligence/insights-ads-detail.md`
- Purpose: retrieve detailed information for one top ad insight item.
- Best suited for:
  - explaining a selected ad's performance signals
  - reviewing creative, advertiser, product, or landing context
  - building a single-ad analysis report

### Rules

- Use after `Top Ads Insights` or when the user provides a valid ad identifier accepted by the docs.
- Separate facts returned by the API from creative recommendations.

## 9. Keyword Insights

- Documentation: `https://docs.keyapi.ai/tiktok/intelligence/insights-keyword.md`
- Purpose: retrieve market insight around a keyword.
- Best suited for:
  - product opportunity research
  - consumer interest checks
  - category or keyword demand exploration
  - finding related products, creators, or content themes

### Rules

- Use this first when the user's request starts from a keyword rather than a known product, creator, ad, or hashtag.
- Enrich related products through Shop endpoints, related creators through Influencer or Shop Creator endpoints, and related videos through Content endpoints.
- Avoid presenting keyword insight as sales proof unless commerce metrics are returned or enriched.

## 10. Top Products Insights

- Documentation: `https://docs.keyapi.ai/tiktok/intelligence/insights-products.md`
- Purpose: retrieve top product insight lists for a category, keyword, or market slice.
- Best suited for:
  - market opportunity scans
  - top product discovery
  - category demand comparison
  - building a shortlist for deeper product validation

### Rules

- Use this for market-level top product discovery.
- Preserve product identifiers for `Top Product Insights Detail` and Shop product detail/trends/reviews enrichment.
- Use Shop product ranking or list analytics when the user needs product-level commerce filtering rather than intelligence insight.

## 11. Top Product Insights Detail

- Documentation: `https://docs.keyapi.ai/tiktok/intelligence/insights-product-detail.md`
- Purpose: retrieve detailed intelligence for a selected top product insight item.
- Best suited for:
  - explaining one product opportunity
  - validating why a product appears in insight results
  - preparing a product opportunity note before deeper Shop analysis

### Rules

- Use after `Top Products Insights` or when the required product insight identifier is already known.
- For price, reviews, creators, videos, live sessions, or product trend curves, enrich through `tiktok-shop-rules.md`.

## 12. Common Workflows

- Trend brief: `Trending Videos` + `Trending Hashtags` + `Trending Music`, then enrich selected items.
- Ad research: `Top Ads Insights` -> `Top Ad Insights Detail`.
- Keyword opportunity: `Keyword Insights` -> Shop product and creator enrichment.
- Product opportunity: `Top Products Insights` -> `Top Product Insights Detail` -> Shop product detail, trends, reviews, creators, videos, and live sessions.
