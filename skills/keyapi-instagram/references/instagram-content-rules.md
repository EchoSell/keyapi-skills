# Instagram Content Module Rules

## 1. Module Scope

Use this module for Instagram post detail, comments, replies, likes, shortcode/media ID conversion, hashtag posts, music posts, Reels search, and explore section content.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Post Detail And Identifier Conversion

- Documentation: `https://docs.keyapi.ai/instagram/get-post-info.md`
- Documentation: `https://docs.keyapi.ai/instagram/convert-shortcode-to-media-id.md`
- Documentation: `https://docs.keyapi.ai/instagram/convert-media-id-to-shortcode.md`
- Purpose: retrieve post detail and convert between shortcode and media ID.
- Best suited for post URL analysis, ID normalization, and preparing comment or likes workflows.

### Rules

- Use post info when the user provides a post URL or shortcode.
- Convert identifiers only when downstream endpoints require a different ID type.

## 3. Comments, Replies, And Likes

- Documentation: `https://docs.keyapi.ai/instagram/get-post-comments.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-comment-replies.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-post-likes.md`
- Purpose: retrieve post engagement details.
- Best suited for comment review, reply expansion, liker sampling, and engagement evidence.

### Rules

- Use comments before replies; replies require a known comment ID.
- Use likes only when the user asks for liked-by data or engagement accounts.

## 4. Hashtag, Music, Reels, And Explore Content

- Documentation: `https://docs.keyapi.ai/instagram/get-posts-by-hashtag.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-posts-using-specific-music.md`
- Documentation: `https://docs.keyapi.ai/instagram/search-reels.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-explore-page-sections.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-posts-by-section.md`
- Purpose: retrieve content from hashtag, music, Reels, or Explore surfaces.
- Best suited for topic discovery, audio trend checks, Reels research, and Explore section review.

### Rules

- Resolve the hashtag, music, or section first when the endpoint requires an ID.
- Enrich selected posts with post info, comments, replies, and likes.

## 5. Common Workflows

- Post report: post info -> comments -> selected replies -> likes if needed.
- Hashtag/content research: hashtag posts or Reels search -> post info for selected posts.
- Music trend review: search/known music -> posts using specific music -> post detail.
