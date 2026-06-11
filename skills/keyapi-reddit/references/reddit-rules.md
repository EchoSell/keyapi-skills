# Reddit Rules

## Entity Scope

posts, comments, sub-comments, users, subreddits, feeds, rules, settings, channels, trophies, communities, search results

## Platform-Specific Rules

- Post detail batch endpoints have documented max sizes; confirm the latest limits.
- Nested comment traversal requires parent comment or cursor fields from prior responses.
- Do not treat app feed endpoints as subreddit-specific unless the docs say so.

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
