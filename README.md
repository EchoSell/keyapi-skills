# KeyAPI Agent Skills

A collection of agent skills for the [KeyAPI](https://keyapi.ai/) MCP service, organized by platform. Compatible with Claude Code, OpenClaw, and any agent that supports the standard skill format.

## What Are Skills?

Each skill is a **self-contained directory** containing a `SKILL.md` that instructs an AI agent how to:
1. Select the right API nodes for a given analysis objective
2. Authenticate and call the KeyAPI MCP server via `scripts/run.js`
3. Cache results locally for reuse and efficiency
4. Synthesize data into actionable insights

Each skill bundles its own `scripts/run.js` and `package.json` — no shared dependencies, no monorepo tooling required.

---

## Quick Start

```bash
# Pick any skill and install it
cd skills/tiktok/keyapi-tiktok-influencer-discovery
npm install
export KEYAPI_TOKEN=your_token_here

# Verify connection
node scripts/run.js --list-tools

# Run a tool
node scripts/run.js --tool search_influencers \
  --params '{"keyword":"fitness","region":"US"}' --pretty
```

**MCP Server:** `https://mcp.keyapi.ai`
**Auth:** `Authorization: Bearer $KEYAPI_TOKEN`

---

## Skills Index

### TikTok Platform

| Skill | Description |
|-------|-------------|
| [keyapi-tiktok-influencer-discovery](skills/tiktok/keyapi-tiktok-influencer-discovery/SKILL.md) | Discover, profile, and analyze TikTok influencers — search, analytics, trends, live commerce, and rankings |
| [keyapi-tiktok-shop-creator-discovery](skills/tiktok/keyapi-tiktok-shop-creator-discovery/SKILL.md) | Analyze TikTok Shop creators — sales metrics, GMV, audience demographics, and content performance |
| [keyapi-tiktok-ecommerce](skills/tiktok/keyapi-tiktok-ecommerce/SKILL.md) | Comprehensive TikTok Shop market intelligence — products, shops, categories, GMV, reviews, and competitive dynamics |
| [keyapi-tiktok-content-analysis](skills/tiktok/keyapi-tiktok-content-analysis/SKILL.md) | Analyze TikTok content — videos, hashtags, music, live streams, comments, and sentiment at scale |
| [keyapi-tiktok-intelligence](skills/tiktok/keyapi-tiktok-intelligence/SKILL.md) | Real-time TikTok trend intelligence — trending topics, viral music, breakout videos, top ads, and product insights |

### Instagram Platform

| Skill | Description |
|-------|-------------|
| [keyapi-instagram-user-analysis](skills/instagram/keyapi-instagram-user-analysis/SKILL.md) | Discover and analyze Instagram users — profile, posts, Reels, Stories, Highlights, followers, following, tagged posts, reposts, similar users |
| [keyapi-instagram-content-discovery](skills/instagram/keyapi-instagram-content-discovery/SKILL.md) | Explore Instagram content at scale — posts, comments, hashtags, music, Explore page, locations, search |

### YouTube Platform

| Skill | Description |
|-------|-------------|
| [keyapi-youtube-video-analysis](skills/youtube/keyapi-youtube-video-analysis/SKILL.md) | Analyze YouTube videos at depth — metadata, comments, sub-comments, stream formats, related videos, Shorts search, video search, trending |
| [keyapi-youtube-channel-analysis](skills/youtube/keyapi-youtube-channel-analysis/SKILL.md) | Discover and analyze YouTube channels — channel metadata, video library, ID/URL conversion, channel search, filtered search, suggestions |

### Twitter Platform

| Skill | Description |
|-------|-------------|
| [keyapi-twitter-content-analytics](skills/twitter/keyapi-twitter-content-analytics/SKILL.md) | Explore and analyze Twitter/X content — tweets, user profiles, posts, replies, media, comments, retweets, search, trending, followers, following |

### LinkedIn Platform

| Skill | Description |
|-------|-------------|
| [keyapi-linkedin-user-analytics](skills/linkedin/keyapi-linkedin-user-analytics/SKILL.md) | Discover and analyze LinkedIn professionals — profile, contact info, posts, comments, videos, experience, education, skills, certifications, publications, honors, recommendations, interests, and people search |
| [keyapi-linkedin-company-analysis](skills/linkedin/keyapi-linkedin-company-analysis/SKILL.md) | Explore and analyze LinkedIn companies — company profile, employee directory, posts, job listings with rich filters, job counts, and job detail |

### Reddit Platform

| Skill | Description |
|-------|-------------|
| [keyapi-reddit-content-analytics](skills/reddit/keyapi-reddit-content-analytics/SKILL.md) | Explore and analyze Reddit posts, comments, and feeds — single/batch post details, threaded comment traversal, user activity, and curated feed monitoring |
| [keyapi-reddit-user-analysis](skills/reddit/keyapi-reddit-user-analysis/SKILL.md) | Discover and analyze Reddit users and subreddits — user profiles, active communities, trophies, subreddit rules/settings, dynamic search, and trending intelligence |

### Threads Platform

| Skill | Description |
|-------|-------------|
| [keyapi-threads-user-discovery](skills/threads/keyapi-threads-user-discovery/SKILL.md) | Discover and analyze Threads users and content — user profiles, posts, reposts, replies, post details, comments, and keyword-based search across top content, recent content, and profiles |

### Amazon Platform

| Skill | Description |
|-------|-------------|
| [keyapi-amazon-ecommerce](skills/amazon/keyapi-amazon-ecommerce/SKILL.md) | Explore and analyze Amazon marketplace data — product search, category browsing, product details, best sellers, deals, reviews, offers, seller intelligence, influencer storefronts, and ASIN/GTIN conversion across 24 marketplaces |

### Facebook Platform

| Skill | Description |
|-------|-------------|
| [keyapi-facebook-analysis](skills/facebook/keyapi-facebook-analysis/SKILL.md) | Explore and analyze public Facebook profiles, pages, and groups — profile details, posts, photos, Reels, group activity, group events, and identifier resolution |

### Pinterest Platform

| Skill | Description |
|-------|-------------|
| [keyapi-pinterest-analysis](skills/pinterest/keyapi-pinterest-analysis/SKILL.md) | Discover and analyze Pinterest users, pins, boards, and social graphs — user search, profile info, pin libraries, board collections, follower and following network traversal |

### Google Platform

| Skill | Description |
|-------|-------------|
| [keyapi-google-search](skills/google/keyapi-google-search/SKILL.md) | Perform Google web and image searches — retrieve ranked web results with titles, snippets, and URLs, or search for images with country and language targeting, result count control, and page-based pagination |

---

## Common Rules (All TikTok Skills)

| Rule | Detail |
|------|--------|
| **Pagination** | `*_analytics` endpoints use `page_num`/`page_size` (starts at `1`, max `10`). Trending endpoints (`trending_*`, `keyword_insights`, `top_*_insights`) use `page`/`limit`. Never use page `0`. |
| **Cover images** | Batch-convert all image URLs with host `echosell-images.tos-ap-southeast-1.volces.com` via `batch_download_cover_images` before storing or displaying. |
| **Success check** | `code = 0` → success. Any other code → failure. Always check before processing data. |
| **Retry on 500** | If `code = 500`, retry once after a brief pause before escalating. |
| **Cache first** | Always check `.keyapi-cache/` before making a live API call. Cache is date-scoped (`YYYY-MM-DD`). |

