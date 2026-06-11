# Pinterest Rules

## Entity Scope

users, pins, boards, followers, following, usernames

## Platform-Specific Rules

- Resolve the user identifier accepted by the endpoint before requesting pins, boards, or network data.
- Pinterest pagination can be cursor-style; inspect docs and first response before fetching more pages.
- Separate user search from user detail workflows.

## Documentation Hints

- Filter `https://docs.keyapi.ai/llms.txt` for links under `https://docs.keyapi.ai/pinterest/`.
- Treat endpoint titles as hints, not stable tool names.
- Extract the current REST method and path from the OpenAPI block on the docs page.
- Use examples from the docs page only after replacing sample identifiers with user-provided or resolved identifiers.

## Output Guidance

- For discovery tasks, return ranked candidates with key evidence and next-step enrichment suggestions.
- For detail tasks, return a compact entity profile plus important raw identifiers.
- For trend/ranking tasks, state the metric, time window, market, and any API coverage limitations.
- For reports, organize findings by entity, performance signals, risks, and recommended follow-up calls.
