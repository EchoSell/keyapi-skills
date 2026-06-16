# Facebook Public Data Module Rules

## 1. Module Scope

Use this module for public Facebook profile, page, group, post, photo, Reel, and event workflows.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Profile ID And Profile Detail

- Documentation: `https://docs.keyapi.ai/facebook/get-profile-id.md`
- Documentation: `https://docs.keyapi.ai/facebook/profile-details-by-url.md`
- Documentation: `https://docs.keyapi.ai/facebook/profiles-details-by-id.md`
- Purpose: resolve Facebook profile/page identifiers and retrieve public profile details.
- Best suited for profile/page lookup from URLs, ID normalization, and profile enrichment.

### Rules

- Use URL-based detail when the user provides a profile URL and the docs support it.
- Use `Get profile id` before ID-based detail when a downstream endpoint requires an ID.

## 3. Profile Posts, Photos, And Reels

- Documentation: `https://docs.keyapi.ai/facebook/profile-posts.md`
- Documentation: `https://docs.keyapi.ai/facebook/profiles-photos.md`
- Documentation: `https://docs.keyapi.ai/facebook/profile-reels.md`
- Purpose: retrieve public profile/page content streams.
- Best suited for public post history, photo library, and Reels content review.

### Rules

- Use the narrowest content endpoint that matches the user's requested media type.
- Preserve pagination tokens or IDs for continuation and follow-up analysis.

## 4. Group ID And Group Details

- Documentation: `https://docs.keyapi.ai/facebook/get-group-id.md`
- Documentation: `https://docs.keyapi.ai/facebook/get-group-details.md`
- Purpose: resolve public Facebook group IDs and retrieve group details.
- Best suited for group lookup, group profile checks, and preparing group posts/events retrieval.

### Rules

- Resolve the group ID first when the user provides only a group URL or ambiguous group reference.
- Keep group identity separate from group content.

## 5. Group Posts And Future Events

- Documentation: `https://docs.keyapi.ai/facebook/get-group-posts.md`
- Documentation: `https://docs.keyapi.ai/facebook/get-group-future-events.md`
- Purpose: retrieve public group posts or future group events.
- Best suited for community monitoring, public discussion review, and upcoming event discovery.

### Rules

- Use group posts for content monitoring and group future events for event planning or event lookup.
- Respect pagination and public-data availability exactly as returned by the API.

## 6. Common Workflows

- Profile report: profile URL or ID resolution -> profile detail -> posts/photos/Reels.
- Group report: group ID resolution -> group details -> group posts/events.
- Content review: choose posts, photos, Reels, group posts, or events based on the user's target surface.
