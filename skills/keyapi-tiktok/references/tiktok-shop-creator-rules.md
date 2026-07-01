# TikTok Shop Creator Module Rules

## 1. Module Scope

Use this module for TikTok Shop creator resolution, detail, audience, sales, videos, and trends.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always resolve the selected endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## Table Of Contents

2. Shop creator resolution and detail
3. Audience and sales
4. Videos and trends

## 2. Shop creator resolution and detail

- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/search.md`
- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/detail.md`
- Purpose: Resolve creator_oecuid and retrieve basic Shop creator profile/performance.

### Best Suited For

- Shop creator lookup
- creator_oecuid resolution
- commerce creator profile

### Routing Rules

- Use search when starting from TikTok unique ID.
- Use detail after creator_oecuid or required ID is known.
- Do not substitute regular influencer IDs for Shop creator IDs unless the docs allow it.

## 3. Audience and sales

- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/audience.md`
- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/sales.md`
- Purpose: Retrieve fan portrait and product promotion/sales data for a Shop creator.

### Best Suited For

- affiliate partner evaluation
- audience fit analysis
- sales contribution review

### Routing Rules

- Use audience when demographics or fan portrait matters.
- Use sales when GMV/items/video-driven sales performance matters.
- Combine only after confirming the report sections.

## 4. Videos and trends

- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/videos.md`
- Documentation: `https://docs.keyapi.ai/tiktok/shop-creator/trends.md`
- Purpose: Retrieve Shop creator product videos and performance trends.

### Best Suited For

- creator video commerce audit
- follower/view/sales trend review
- Shop creator report

### Routing Rules

- Use videos for promoted product video evidence.
- Use trends when the user asks how the creator changed over time.

## 5. Common Workflows

- Shop creator report: search -> detail -> audience/sales/videos/trends as approved.
- Partner screening: search/detail -> audience -> sales -> selected videos.
