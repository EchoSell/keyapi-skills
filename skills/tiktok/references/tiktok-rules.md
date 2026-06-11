# TikTok Rules

## Entity Scope

influencers, shop creators, products, shops, categories, videos, hashtags, music, comments, live rooms, ads, trends, audiences

## Platform-Specific Rules

- Resolve unique_id, user_id, product_id, seller_id, video_id, hashtag_id, music_id, and room_id before downstream calls.
- Analytics endpoints often use page_num/page_size; realtime endpoints may use offset, cursor, max_cursor, or has_more.
- When both realtime and analytics/offline variants exist, ask the user which data freshness mode they need.
- Convert echosell image URLs only when the official docs still expose a cover conversion endpoint; otherwise report image URL limitations.

## Documentation Hints

- Filter `https://docs.keyapi.ai/llms.txt` for links under `https://docs.keyapi.ai/tiktok/`.
- Treat endpoint titles as hints, not stable tool names.
- Extract the current REST method and path from the OpenAPI block on the docs page.
- Use examples from the docs page only after replacing sample identifiers with user-provided or resolved identifiers.

## Output Guidance

- For discovery tasks, return ranked candidates with key evidence and next-step enrichment suggestions.
- For detail tasks, return a compact entity profile plus important raw identifiers.
- For trend/ranking tasks, state the metric, time window, market, and any API coverage limitations.
- For reports, organize findings by entity, performance signals, risks, and recommended follow-up calls.
