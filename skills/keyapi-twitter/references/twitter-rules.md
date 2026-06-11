# Twitter / X Rules

## Entity Scope

tweets, threads, replies, profiles, users, timelines, media, trends, communities, lists, jobs, spaces, followers, following, retweets

## Platform-Specific Rules

- Twitter/X endpoints may distinguish tweet ID, rest_id, screen name, and list/community IDs; resolve explicitly.
- Search modes such as top/latest/media/people are not interchangeable; confirm enum names in docs.
- For timelines and social graph endpoints, follow cursor fields returned by the prior response.

## Documentation Hints

- Filter `https://docs.keyapi.ai/llms.txt` for links under `https://docs.keyapi.ai/twitter/`.
- Treat endpoint titles as hints, not stable tool names.
- Extract the current REST method and path from the OpenAPI block on the docs page.
- Use examples from the docs page only after replacing sample identifiers with user-provided or resolved identifiers.

## Output Guidance

- For discovery tasks, return ranked candidates with key evidence and next-step enrichment suggestions.
- For detail tasks, return a compact entity profile plus important raw identifiers.
- For trend/ranking tasks, state the metric, time window, market, and any API coverage limitations.
- For reports, organize findings by entity, performance signals, risks, and recommended follow-up calls.
