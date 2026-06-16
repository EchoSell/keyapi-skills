# Twitter Profile And Social Graph Module Rules

## 1. Module Scope

Use this module for Twitter/X user profile, about profile, affiliated accounts, followers, following, check follow, retweets, check retweet, user media, and user live workflows.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. User Profile And About

- Documentation: `https://docs.keyapi.ai/twitter/user-info.md`
- Documentation: `https://docs.keyapi.ai/twitter/about-profile.md`
- Documentation: `https://docs.keyapi.ai/twitter/profiles-by-restids.md`
- Purpose: retrieve Twitter/X profile information and resolve profile IDs.
- Best suited for account lookup, profile enrichment, and batch profile detail.

### Rules

- Use profile lookup before timeline, follower, or relationship workflows when identifiers are uncertain.
- Preserve rest IDs/user IDs exactly for downstream endpoints.

## 3. Social Graph And Relationships

- Documentation: `https://docs.keyapi.ai/twitter/followers.md`
- Documentation: `https://docs.keyapi.ai/twitter/following.md`
- Documentation: `https://docs.keyapi.ai/twitter/check-follow.md`
- Documentation: `https://docs.keyapi.ai/twitter/affilates.md`
- Purpose: retrieve followers, following, follow status, and affiliated accounts.
- Best suited for network analysis, relationship checks, and organization/account relationship mapping.

### Rules

- Use followers/following only when network traversal is explicitly requested.
- Use check follow for relationship verification between known accounts.

## 4. Retweets, Media, And Live

- Documentation: `https://docs.keyapi.ai/twitter/retweets.md`
- Documentation: `https://docs.keyapi.ai/twitter/check-retweet.md`
- Documentation: `https://docs.keyapi.ai/twitter/users-media.md`
- Documentation: `https://docs.keyapi.ai/twitter/user-live.md`
- Purpose: retrieve retweet relationships, user media, or live status/content.
- Best suited for amplification analysis, media review, and account live checks.

### Rules

- Use retweet endpoints only when tweet IDs and user/account context are known.
- Use media or live endpoints only when the requested surface is media or live content.

## 5. Common Workflows

- Profile report: user info/about -> timeline/media/followers as needed.
- Network check: profile resolution -> followers/following or check follow.
- Amplification check: tweet info -> retweets/check retweet.
