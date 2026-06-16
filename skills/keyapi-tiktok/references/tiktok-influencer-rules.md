# TikTok Influencer Module Rules

## 1. Module Scope

Use this module for non-Shop TikTok creator and influencer workflows. Typical examples include:

- identifying creators with fast follower growth
- finding creators by keyword, category, GMV, engagement, or audience fit
- retrieving creator profile and analytics detail
- evaluating creator video, product, and live performance
- analyzing follower/following networks, regional signals, milestones, and trends

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Search Influencers

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/search.md`
- Purpose: search TikTok influencers by keyword and return matching creator profiles with basic metrics.
- Best suited for:
  - finding a creator when the user only knows a name, handle fragment, or keyword
  - lightweight discovery before richer analytics enrichment
  - resolving candidate creators before detail calls

### Rules

- Use this before detail endpoints when the exact `unique_id` or user identifier is uncertain.
- For broad creator discovery with advanced performance filters, prefer `Influencer List (Analytics)`.
- Preserve returned creator identifiers for downstream detail, videos, products, trends, or ranking calls.

## 3. Get Influencer Detail

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/detail.md`
- Purpose: retrieve real-time profile information for a TikTok influencer by unique ID.
- Best suited for:
  - current public profile checks
  - quick follower, bio, video count, and basic engagement lookup
  - validating a known creator before analytics enrichment

### Rules

- Use for current public-facing creator data.
- If the user asks for historical growth, product promotion, audience insight, sales, or GMV, use `Influencer Detail (Analytics)` instead or as enrichment.

## 4. Influencer Detail (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/detail-analytics.md`
- Purpose: retrieve comprehensive analytics data for one or more influencers.
- Best suited for:
  - historical follower growth and performance analysis
  - commerce and product promotion analysis
  - audience and engagement analysis
  - creator profile reports

### Rules

- Prefer this endpoint for creator reports and commerce-oriented influencer analysis.
- If multiple creators are supported by the current docs, batch enrichment can follow search/list/ranking results.
- Separate analytics-derived historical metrics from real-time profile facts in the final answer.

## 5. Influencer List (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/list-analytics.md`
- Purpose: search and filter TikTok influencers using rich analytics metrics.
- Best suited for:
  - multi-condition creator discovery
  - screening creators by follower trends, engagement, sales, or historical performance
  - building ranked shortlists for outreach or market analysis

### Rules

- Use this first when the user asks to "find creators", "discover influencers", or filter creators by performance criteria.
- Prefer API-side filters from the docs over client-side filtering.
- Enrich only shortlisted creators with detail, trends, videos, products, or livestream endpoints.

## 6. Influencer Ranking (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/ranking-analytics.md`
- Purpose: retrieve ranked influencer lists sorted by metrics such as follower count, GMV, or engagement.
- Best suited for:
  - top creator leaderboards
  - fastest-growing creator discovery
  - GMV, follower, or engagement ranking requests
  - competitor benchmarking

### Rules

- Use when the user asks for `top`, `best`, `ranking`, `leaderboard`, `fastest growing`, or metric-driven comparisons.
- Always state the metric, market, category, and time window when available from docs or response.
- For explanation tasks, enrich ranked creators with detail, videos, products, and trends.

## 7. Influencer Trends (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/trends-analytics.md`
- Purpose: retrieve historical trend snapshots for follower growth, views, and engagement.
- Best suited for:
  - growth curve analysis
  - before/after campaign checks
  - creator health monitoring
  - validating ranking movement

### Rules

- Use for time-series creator analysis rather than a static profile snapshot.
- Check the docs for supported date ranges and pagination before calling.
- Explain gaps or missing periods as API coverage limitations unless the docs state another meaning.

## 8. Get Influencer Videos

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/videos.md`
- Purpose: retrieve the latest video list for a TikTok influencer.
- Best suited for:
  - recent creator content review
  - basic video performance inspection
  - finding latest posts before deeper video detail calls

### Rules

- Use for current/latest creator videos.
- If the user needs commerce, product association, historical views, or enhanced metrics, prefer `Influencer Videos (Analytics)`.

## 9. Influencer Videos (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/videos-analytics.md`
- Purpose: retrieve analytics-enriched creator video lists.
- Best suited for:
  - creator video performance reports
  - product-associated video analysis
  - sales, GMV, or engagement trend analysis at video level

### Rules

- Use when commerce or historical performance metrics matter.
- For top-performing videos, sort/filter according to the current docs and enrich selected videos with content module endpoints if needed.

## 10. Influencer Products (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/products-analytics.md`
- Purpose: retrieve products promoted by a TikTok influencer.
- Best suited for:
  - creator product portfolio analysis
  - identifying promoted products and sales contribution
  - creator-product relationship reports

### Rules

- Use after creator resolution or detail lookup.
- For product-level validation, enrich products through `tiktok-shop-rules.md` product detail, trends, reviews, creators, videos, or livestream endpoints.

## 11. Influencer Livestreams (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/livestreams-analytics.md`
- Purpose: retrieve historical livestream records for a TikTok influencer.
- Best suited for:
  - creator live commerce history
  - live GMV and viewer analysis
  - product sales from past live sessions

### Rules

- Use when the user asks about live selling, historical live sessions, GMV, viewers, or live product performance.
- For live detail of an active/recent stream, use content live endpoints when the docs fit the request.

## 12. Get Influencer Followers

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/followers.md`
- Purpose: retrieve follower list for a TikTok influencer.
- Best suited for:
  - follower sampling
  - audience network exploration
  - follower list traversal when explicitly requested

### Rules

- Use only when the user asks for follower lists or network traversal.
- Respect pagination exactly as documented.
- Do not infer audience demographics from follower samples unless clearly framed as a sample.

## 13. Get Influencer Following

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/following.md`
- Purpose: retrieve accounts followed by a TikTok influencer.
- Best suited for:
  - network and relationship exploration
  - competitor or interest mapping
  - finding related creator ecosystems

### Rules

- Use only when following relationships are directly relevant.
- Preserve pagination cursors or offsets for continuation.

## 14. Get Influencer Region

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/region.md`
- Purpose: retrieve regional data for a TikTok influencer.
- Best suited for:
  - audience geography analysis
  - market-fit checks
  - regional creator screening

### Rules

- Use when the user asks about audience geography, region, market fit, or country distribution.
- State whether the returned data describes creator region, audience region, or another regional signal according to the docs/response.

## 15. Get Influencer Milestones

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/milestones.md`
- Purpose: retrieve milestone and achievement data for a TikTok influencer.
- Best suited for:
  - growth achievement summaries
  - historical creator progress checks
  - identifying notable follower milestones

### Rules

- Use as a supporting endpoint for creator growth reports.
- Do not substitute milestones for full time-series trend analysis.

## 16. Get Influencer QR Code

- Documentation: `https://docs.keyapi.ai/tiktok/influencer/qrcode.md`
- Purpose: generate a QR code for a TikTok influencer profile page.
- Best suited for:
  - marketing material workflows
  - profile sharing utilities
  - campaign handoff assets

### Rules

- Use only when the user explicitly asks for QR code or share asset generation.
- Do not call this as part of normal influencer analysis.

## 17. Common Workflows

- Creator discovery: `Search Influencers` or `Influencer List (Analytics)` -> detail selected creators.
- Creator report: `Get Influencer Detail` -> `Influencer Detail (Analytics)` -> trends, videos, products, and livestreams.
- Growth analysis: `Influencer Ranking (Analytics)` -> `Influencer Trends (Analytics)` -> detail selected creators.
- Commerce analysis: `Influencer Products (Analytics)` -> enrich selected products through TikTok Shop product detail, trends, reviews, creators, videos, and livestreams.
- Network lookup: use followers or following only when the user explicitly asks for relationship traversal.
