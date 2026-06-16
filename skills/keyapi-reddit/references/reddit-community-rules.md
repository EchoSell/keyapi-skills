# Reddit Community Module Rules

## 1. Module Scope

Use this module for subreddit info, subreddit feed, community highlights, subreddit rules/style, subreddit settings, post channels, muted status, and active communities.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Subreddit Info And Feed

- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-subreddit-info.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-subreddit-feed.md`
- Purpose: retrieve subreddit profile information and post feed.
- Best suited for community overview, content monitoring, and subreddit research.

### Rules

- Use info for community profile and feed for current/ordered content.
- Preserve post IDs for post detail and comment workflows.

## 3. Rules, Settings, Channels, Highlights, And Muted Status

- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-subreddit-rules-and-style-info.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-subreddit-settings.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-subreddit-post-channels.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-community-highlights.md`
- Documentation: `https://docs.keyapi.ai/reddit/check-if-subreddit-is-muted.md`
- Purpose: retrieve community governance, style, posting channels, highlighted content, and muted status.
- Best suited for moderation context, posting feasibility, community policy checks, and highlighted post review.

### Rules

- Use only the governance/support endpoint that matches the user's question.
- Keep rules/settings facts separate from post performance or user activity.

## 4. User Active Subreddits

- Documentation: `https://docs.keyapi.ai/reddit/fetch-user-s-active-subreddits.md`
- Purpose: retrieve communities where a user is most active.
- Best suited for user interest mapping and community-affinity analysis.

### Rules

- Use after a Reddit username is known.
- Do not present active communities as exhaustive interests unless the API states that coverage.

## 5. Common Workflows

- Community report: subreddit info -> feed -> rules/settings/highlights as needed.
- Posting policy review: subreddit info -> rules/style -> settings/channels.
- User-community map: user active subreddits -> subreddit info for selected communities.
