# Instagram Rules

## Entity Scope

users, profiles, posts, reels, stories, highlights, followers, following, tags, reposts, comments, hashtags, music, places, locations

## Platform-Specific Rules

- Resolve username, user ID, shortcode, and media ID explicitly when endpoints require different identifiers.
- Stories are freshness-sensitive and may expire; use realtime expectations.
- Use pagination cursors or page fields exactly as documented for each endpoint.

## Scenario Module Routing

- Use `instagram-user-rules.md` for user search, profiles, user posts/Reels/stories/highlights/tagged/reposts, followers/following, related profiles, and similar users.
- Use `instagram-content-rules.md` for post detail, comments, replies, likes, hashtag posts, music posts, Reels, Explore, and shortcode/media ID conversion.
- Use `instagram-discovery-rules.md` for general search, hashtag/music/place search, city lookup, and coordinate-based location search.
- If a request spans multiple modules, load the smallest set of scenario modules needed and confirm report scope before broad multi-endpoint execution.

## Documentation Hints

- Filter `https://docs.keyapi.ai/llms.txt` for links under `https://docs.keyapi.ai/instagram/`.
- Treat endpoint titles as hints, not stable tool names.
- Extract the current REST method and path from the OpenAPI block on the docs page.
- Use examples from the docs page only after replacing sample identifiers with user-provided or resolved identifiers.

## Output Guidance

- For discovery tasks, return ranked candidates with key evidence and next-step enrichment suggestions.
- For detail tasks, return a compact entity profile plus important raw identifiers.
- For trend/ranking tasks, state the metric, time window, market, and any API coverage limitations.
- For reports, organize findings by entity, performance signals, risks, and recommended follow-up calls.
