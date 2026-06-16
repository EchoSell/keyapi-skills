# Reddit Rules

## Entity Scope

posts, comments, sub-comments, users, subreddits, feeds, rules, settings, channels, trophies, communities, search results

## Platform-Specific Rules

- Post detail batch endpoints have documented max sizes; confirm the latest limits.
- Nested comment traversal requires parent comment or cursor fields from prior responses.
- Do not treat app feed endpoints as subreddit-specific unless the docs say so.

## Scenario Module Routing

- Use `reddit-post-comment-rules.md` for post detail, post batch detail, post comments, comment replies, user posts, and user comments.
- Use `reddit-community-rules.md` for subreddit info, feed, highlights, rules/style, settings, channels, muted status, and active communities.
- Use `reddit-discovery-rules.md` for dynamic search, typeahead, trending searches, app feeds, user profile, and public trophies.
- If a request spans multiple modules, load the smallest set of scenario modules needed and confirm report scope before broad multi-endpoint execution.

## Documentation Hints

- Filter `https://docs.keyapi.ai/llms.txt` for links under `https://docs.keyapi.ai/reddit/`.
- Treat endpoint titles as hints, not stable tool names.
- Extract the current REST method and path from the OpenAPI block on the docs page.
- Use examples from the docs page only after replacing sample identifiers with user-provided or resolved identifiers.

## Output Guidance

- For discovery tasks, return ranked candidates with key evidence and next-step enrichment suggestions.
- For detail tasks, return a compact entity profile plus important raw identifiers.
- For trend/ranking tasks, state the metric, time window, market, and any API coverage limitations.
- For reports, organize findings by entity, performance signals, risks, and recommended follow-up calls.
