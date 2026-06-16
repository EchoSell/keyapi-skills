# Reddit Discovery Module Rules

## 1. Module Scope

Use this module for Reddit search, typeahead suggestions, trending searches, app feeds, popular feed, home feed, news feed, games feed, and user profile/trophies.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Dynamic Search And Typeahead

- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-dynamic-search-results.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-search-typeahead-suggestions.md`
- Purpose: search Reddit entities or retrieve search suggestions.
- Best suited for discovering posts, communities, comments, media, users, and query ideas.

### Rules

- Use typeahead for query expansion or entity suggestions.
- Use dynamic search for broad discovery, then route selected results to post, community, or user modules.

## 3. Trending Searches And Feeds

- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-trending-searches.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-popular-feed.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-home-feed.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-news-feed.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-games-feed.md`
- Purpose: retrieve trending searches and feed surfaces.
- Best suited for trend monitoring, popular content discovery, news/gaming feed review, and broad Reddit signal scans.

### Rules

- Choose the feed surface that matches the user's topic or requested Reddit view.
- Enrich selected posts through post detail and comments.

## 4. User Profile And Trophies

- Documentation: `https://docs.keyapi.ai/reddit/fetch-reddit-app-user-profile.md`
- Documentation: `https://docs.keyapi.ai/reddit/fetch-user-public-trophies.md`
- Purpose: retrieve Reddit user profile and public trophy data.
- Best suited for user identity context and account credibility/history checks.

### Rules

- Use profile before user posts/comments when the user wants account context.
- Use public trophies only when achievements/account history are relevant.

## 5. Common Workflows

- Discovery: typeahead or dynamic search -> route selected results to post/community/user endpoints.
- Trend scan: trending searches or feed endpoint -> selected post detail/comments.
- User context: user profile -> posts/comments -> trophies or active communities as needed.
