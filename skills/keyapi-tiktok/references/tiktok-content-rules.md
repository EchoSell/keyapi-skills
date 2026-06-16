# TikTok Content Module Rules

## 1. Module Scope

Use this module for TikTok videos, comments, captions, downloads, hashtags, music, live streams, cover images, and broad content search. Typical examples include:

- searching videos by keyword
- retrieving video detail, comments, replies, captions, products, and download URLs
- analyzing video interaction trends and ranking
- finding hashtag, music, or live stream content
- preparing content evidence for product, creator, or trend reports

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Search Videos

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-search.md`
- Purpose: search TikTok videos by keyword.
- Best suited for:
  - starting from a topic, brand, creator keyword, or product phrase
  - finding recent examples before selecting videos for detail calls
  - lightweight content discovery

### Rules

- Use this first when the user asks for videos by keyword and does not need analytics filters.
- Preserve returned video identifiers for detail, comments, captions, products, download, and trends.
- For metric-filtered or historical discovery, use `Video List (Analytics)` instead.

## 3. Get Video Detail

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-detail.md`
- Purpose: retrieve current public metadata for a TikTok video.
- Best suited for:
  - validating a video URL or ID
  - checking current title, creator, engagement, music, and basic metadata
  - preparing a selected video for comment, caption, product, or download follow-up

### Rules

- Use for current video facts.
- If the user asks for historical performance, commerce analytics, or ranking context, use analytics endpoints as enrichment.

## 4. Video Detail (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-detail-analytics.md`
- Purpose: retrieve analytics-enriched detail for a video.
- Best suited for:
  - video performance reports
  - commerce or product-linked video analysis
  - historical engagement and sales context

### Rules

- Use this when the request includes sales, GMV, product impact, historical metrics, or analytics detail.
- Keep real-time metadata and analytics metrics separate in the answer.

## 5. Video List (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-list-analytics.md`
- Purpose: retrieve filtered video lists with analytics fields.
- Best suited for:
  - discovering videos by metrics, category, date range, or commerce filters
  - building a shortlist of content for analysis
  - finding product-related or high-performing videos

### Rules

- Use this instead of realtime search when filtering and analytics fields are central to the request.
- Apply API-side filters from the docs whenever possible.
- Enrich only selected videos with detail, comments, captions, products, or trend endpoints.

## 6. Video Ranking (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-ranking-analytics.md`
- Purpose: retrieve ranked TikTok videos.
- Best suited for:
  - top video lists
  - leaderboard-style requests
  - identifying best-performing videos by views, engagement, sales, or other supported metrics

### Rules

- Use when the user asks for top, best, ranking, fastest-growing, or leaderboard content.
- State the ranking metric, market, category, and time window when available.
- Use detail endpoints only for selected ranked videos.

## 7. Video Interaction Trends

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-trends.md`
- Purpose: retrieve recent interaction trend data for a video.
- Best suited for:
  - short-window engagement checks
  - recent momentum analysis
  - verifying whether a video is still growing

### Rules

- Use when the user needs recent interaction movement rather than a static detail snapshot.
- Check the docs for supported lookback window and metric names before calling.

## 8. Video Trends (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-trends-analytics.md`
- Purpose: retrieve analytics trend snapshots for a video.
- Best suited for:
  - historical video growth analysis
  - campaign performance monitoring
  - comparing engagement over time

### Rules

- Use when the user asks for historical trend curves or analytics-grade trend data.
- Mention date range and granularity when returned.

## 9. Video Products (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-products-analytics.md`
- Purpose: retrieve products associated with a video.
- Best suited for:
  - finding what a video promotes
  - connecting content performance to product performance
  - preparing product enrichment from a video-led workflow

### Rules

- Use when the user asks what products appear in, are linked to, or were promoted by a video.
- Enrich selected products through `tiktok-shop-rules.md`.

## 10. Get Video Comments

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-comments.md`
- Purpose: retrieve top-level comments for a video.
- Best suited for:
  - audience reaction review
  - collecting comment examples
  - identifying questions, objections, or purchase intent in comments

### Rules

- Use this before comment replies.
- Preserve comment identifiers and cursors for pagination or reply expansion.
- For summary-only keyword needs, consider `Video Comment Keywords` before fetching many pages.

## 11. Get Video Comment Replies

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-comment-replies.md`
- Purpose: retrieve replies under a specific video comment.
- Best suited for:
  - expanding a comment thread
  - analyzing discussion under a high-signal comment
  - checking creator or brand replies

### Rules

- Use only after a parent comment ID is known.
- Do not call this for every comment unless the user explicitly asks for full thread traversal.

## 12. Video Comment Keywords

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-comment-keywords.md`
- Purpose: retrieve keyword or topic signals from video comments.
- Best suited for:
  - fast audience-language summaries
  - identifying repeated questions or objections
  - comment theme analysis without full comment crawling

### Rules

- Use when the user asks what people are talking about in comments.
- Treat returned keywords as summary signals, not full sentiment analysis unless the docs say otherwise.

## 13. Get Video Captions

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-captions.md`
- Purpose: retrieve captions or subtitles for a video.
- Best suited for:
  - transcript-based analysis
  - extracting spoken claims or product mentions
  - content accessibility or localization tasks

### Rules

- Use when the user asks for transcript, captions, subtitles, or spoken content.
- If captions are unavailable, state that the API did not return captions rather than inventing a transcript.

## 14. Get Video Download URL

- Documentation: `https://docs.keyapi.ai/tiktok/content/video-download-url.md`
- Purpose: retrieve a downloadable URL for a video.
- Best suited for:
  - download workflows
  - internal review assets
  - preparing media for offline inspection

### Rules

- Use only when the user asks for a download URL or media file access.
- Do not call this as part of normal analytics unless media retrieval is needed.

## 15. Batch Download Cover Images

- Documentation: `https://docs.keyapi.ai/tiktok/content/covers-batch-download.md`
- Purpose: retrieve or process cover images for multiple TikTok videos.
- Best suited for:
  - thumbnail review
  - batch content audits
  - visual merchandising or creative comparison workflows

### Rules

- Use only when multiple cover images are needed.
- Preserve mapping between each input video and returned cover output.

## 16. Search Hashtags

- Documentation: `https://docs.keyapi.ai/tiktok/content/hashtag-search.md`
- Purpose: search hashtags by keyword.
- Best suited for:
  - finding related hashtags for a topic
  - resolving hashtag identifiers
  - preparing a hashtag video lookup

### Rules

- Use for keyword hashtag discovery.
- For currently trending hashtags, use `tiktok-intelligence-rules.md`.

## 17. Get Hashtag Videos

- Documentation: `https://docs.keyapi.ai/tiktok/content/hashtag-videos.md`
- Purpose: retrieve videos associated with a hashtag.
- Best suited for:
  - exploring content under a hashtag
  - collecting examples for a campaign topic
  - analyzing creator or product usage around a hashtag

### Rules

- Use after a hashtag is known or resolved.
- Enrich selected videos with detail, products, comments, captions, or trends.

## 18. Search Music

- Documentation: `https://docs.keyapi.ai/tiktok/content/music-search.md`
- Purpose: search TikTok music or audio tracks by keyword.
- Best suited for:
  - resolving a music track
  - finding audio candidates for a theme
  - starting a music-led content investigation

### Rules

- Use for keyword music lookup.
- For currently trending music, use intelligence trending music endpoints.

## 19. Search Live Streams

- Documentation: `https://docs.keyapi.ai/tiktok/content/live-search.md`
- Purpose: search TikTok live streams.
- Best suited for:
  - finding active or recent live sessions
  - live commerce monitoring
  - locating live rooms before detail lookup

### Rules

- Use this first when the live room identifier is unknown.
- Preserve live or room identifiers for `Get Live Stream Detail`.

## 20. Get Live Stream Detail

- Documentation: `https://docs.keyapi.ai/tiktok/content/live-detail.md`
- Purpose: retrieve detail for a specific TikTok live stream.
- Best suited for:
  - live room inspection
  - current or recent live commerce analysis
  - checking host, products, viewers, or live metadata when available

### Rules

- Use only after a live stream identifier is known.
- For historical creator live sessions, also consider influencer or shop analytics livestream endpoints.

## 21. General Search (Analytics)

- Documentation: `https://docs.keyapi.ai/tiktok/content/search-analytics.md`
- Purpose: run a broader analytics search across TikTok commerce-relevant surfaces.
- Best suited for:
  - user asks for broad TikTok Shop search and does not specify product, shop, influencer, or video
  - exploratory search before choosing a module
  - multi-entity discovery

### Rules

- Use when the user's query spans multiple entity types.
- After results identify entity type, route to Shop, Influencer, Shop Creator, or Content detail endpoints.

## 22. Common Workflows

- Video report: `Get Video Detail` -> `Video Detail (Analytics)` -> comments/captions/products/trends as needed.
- Keyword content search: `Search Videos` or `Video List (Analytics)` -> detail selected videos.
- Comment analysis: `Get Video Comments` -> `Video Comment Keywords` -> selected `Comment Replies`.
- Hashtag analysis: `Search Hashtags` -> `Get Hashtag Videos` -> enrich selected videos.
- Live lookup: `Search Live Streams` -> `Get Live Stream Detail`.
