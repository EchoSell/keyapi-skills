# Instagram User Module Rules

## 1. Module Scope

Use this module for Instagram user search, profile detail, followers, following, related profiles, similar users, stories, highlights, tagged posts, reposts, and user content lists.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. User Search And Profile Detail

- Documentation: `https://docs.keyapi.ai/instagram/search-users.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-user-info.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-user-info-by-user-id.md`
- Purpose: resolve Instagram users and retrieve profile information.
- Best suited for profile lookup, creator validation, and username/user ID normalization.

### Rules

- Use search when the exact username or user ID is unknown.
- Use user-info-by-ID when a workflow starts from an Instagram user ID.
- Preserve user IDs and usernames for downstream user content, network, and story calls.

## 3. User Content Lists

- Documentation: `https://docs.keyapi.ai/instagram/get-user-posts.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-user-reels.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-user-tagged-posts.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-user-reposts-list.md`
- Purpose: retrieve posts, Reels, tagged posts, or reposts for a user.
- Best suited for creator content audits, media library review, and profile content reports.

### Rules

- Choose the content endpoint that matches the requested media surface.
- Preserve post shortcode or media ID for post detail, comments, likes, and ID conversion.

## 4. Stories And Highlights

- Documentation: `https://docs.keyapi.ai/instagram/get-user-stories.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-user-highlights.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-highlight-stories.md`
- Purpose: retrieve active stories, highlight collections, and stories inside a highlight.
- Best suited for ephemeral content checks and profile highlight review.

### Rules

- Use active stories only when the user asks for current stories.
- Use user highlights first, then highlight stories after a highlight ID is known.

## 5. Followers, Following, And Related Profiles

- Documentation: `https://docs.keyapi.ai/instagram/get-user-followers.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-user-following.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-related-profiles.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-similar-users.md`
- Purpose: retrieve relationship networks and recommended similar accounts.
- Best suited for audience/network traversal, creator discovery, and related-account research.

### Rules

- Use followers/following only when relationship lists are directly requested.
- Use related/similar user endpoints for discovery rather than manually crawling large networks.

## 6. Common Workflows

- Profile report: search or direct user info -> posts/Reels/tagged content -> network or stories as needed.
- Creator discovery: search users -> related/similar users -> user info for selected accounts.
- Highlight review: user highlights -> selected highlight stories.
