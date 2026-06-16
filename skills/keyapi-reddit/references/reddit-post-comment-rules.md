# Reddit Post And Comment Module Rules

## 1. Module Scope

Use this module for Reddit post detail, post batch detail, post comments, comment replies, user posts, and user comments.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Post Detail

- Documentation: `https://docs.keyapi.ai/reddit/fetch-single-reddit-post-details.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-post-details-in-batch-max-5.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-post-details-in-large-batch-max-30.md`
- Purpose: retrieve one or more Reddit post details.
- Best suited for post inspection, evidence collection, and batch enrichment of post IDs.

### Rules

- Use single detail for one post and batch endpoints when the user provides multiple post IDs.
- Check batch size limits in the current docs before sending IDs.

## 3. Post Comments And Comment Replies

- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-post-comments.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-comment-replies-sub-comments.md`
- Purpose: retrieve comments under a post and replies under a comment.
- Best suited for discussion analysis, reply expansion, and thread evidence.

### Rules

- Use post comments first; comment replies require a selected comment or cursor from the comment tree.
- Preserve cursors when the response indicates more comments are available.

## 4. User Posts And User Comments

- Documentation: `https://docs.keyapi.ai/reddit/fetch-user-posts.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-user-comments.md`
- Purpose: retrieve posts or comments authored by a Reddit user.
- Best suited for user activity review and account-level content analysis.

### Rules

- Use the endpoint matching the requested activity type.
- Enrich selected post IDs with post detail when full post context is needed.

## 5. Common Workflows

- Post report: single post detail -> comments -> selected comment replies.
- Batch report: batch post details -> comments only for selected posts.
- User activity review: user posts/comments -> post details for important items.
