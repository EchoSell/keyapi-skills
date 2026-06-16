# Threads Social Module Rules

## 1. Module Scope

Use this module for Threads profile search, user detail, user posts, replies, reposts, post detail, comments, and content search.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Profile Search And User Detail

- Documentation: `https://docs.keyapi.ai/threads/search-profiles.md`
- Documentation: `https://docs.keyapi.ai/threads/get-user-info.md`
- Documentation: `https://docs.keyapi.ai/threads/get-user-info-by-id.md`
- Purpose: search Threads profiles and retrieve user information.
- Best suited for profile lookup, user ID normalization, and account summary.

### Rules

- Use search when the exact profile is unknown.
- Use user-info-by-ID when downstream results provide only an ID.

## 3. User Posts, Replies, And Reposts

- Documentation: `https://docs.keyapi.ai/threads/get-user-posts.md`
- Documentation: `https://docs.keyapi.ai/threads/get-user-replies.md`
- Documentation: `https://docs.keyapi.ai/threads/get-user-reposts.md`
- Purpose: retrieve a user's Threads content streams.
- Best suited for profile activity review and account-level content analysis.

### Rules

- Choose posts, replies, or reposts based on the requested activity type.
- Preserve post identifiers for post detail and comments.

## 4. Post Detail And Comments

- Documentation: `https://docs.keyapi.ai/threads/get-post-detail.md`
- Documentation: `https://docs.keyapi.ai/threads/get-post-comments.md`
- Purpose: retrieve one post and its comments.
- Best suited for post-level analysis, discussion review, and engagement evidence.

### Rules

- Use post detail before comments when the user provides a URL or shortcode and context is needed.
- Use comments only when discussion or audience reaction is part of the request.

## 5. Content Search

- Documentation: `https://docs.keyapi.ai/threads/search-top-content.md`
- Documentation: `https://docs.keyapi.ai/threads/search-recent-content.md`
- Purpose: search Threads content by top or recent ordering.
- Best suited for topic discovery, trend checks, and keyword monitoring.

### Rules

- Use top content for high-signal results and recent content for freshness-sensitive monitoring.
- Enrich selected results with post detail and comments.

## 6. Common Workflows

- Profile report: search profiles -> user info -> posts/replies/reposts.
- Post report: post detail -> comments.
- Topic monitor: top or recent content search -> post detail for selected results.
