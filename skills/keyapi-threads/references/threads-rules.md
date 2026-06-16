# Threads Rules

## Entity Scope

users, profiles, posts, reposts, replies, comments, search keywords

## Platform-Specific Rules

- Distinguish top content search, recent content search, and profile search.
- Use post IDs from search/detail responses for comments and thread analysis.
- Apply cursor or pagination fields exactly as documented.

## Scenario Module Routing

- Use `threads-social-rules.md` for profile search, user info, user posts/replies/reposts, post detail, comments, and top/recent content search.
- If a request spans profile and content search, load the same module and keep account-level facts separate from post-level facts.

## Documentation Hints

- Filter `https://docs.keyapi.ai/llms.txt` for links under `https://docs.keyapi.ai/threads/`.
- Treat endpoint titles as hints, not stable tool names.
- Extract the current REST method and path from the OpenAPI block on the docs page.
- Use examples from the docs page only after replacing sample identifiers with user-provided or resolved identifiers.

## Output Guidance

- For discovery tasks, return ranked candidates with key evidence and next-step enrichment suggestions.
- For detail tasks, return a compact entity profile plus important raw identifiers.
- For trend/ranking tasks, state the metric, time window, market, and any API coverage limitations.
- For reports, organize findings by entity, performance signals, risks, and recommended follow-up calls.
