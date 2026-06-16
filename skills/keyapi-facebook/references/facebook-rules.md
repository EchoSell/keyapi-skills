# Facebook Rules

## Entity Scope

profiles, pages, groups, posts, photos, reels, events, profile IDs, group IDs

## Platform-Specific Rules

- Only public Facebook data is in scope. Do not imply private account access.
- Resolve IDs first when downstream endpoints require numeric identifiers.
- For group workflows, distinguish group ID resolution, group details, group posts, and future events.

## Scenario Module Routing

- Use `facebook-public-data-rules.md` for public profile/page details, posts, photos, Reels, group details, group posts, group future events, and ID resolution.
- If a request spans profile/page and group surfaces, load the same module and keep profile/page evidence separate from group evidence.

## Documentation Hints

- Filter `https://docs.keyapi.ai/llms.txt` for links under `https://docs.keyapi.ai/facebook/`.
- Treat endpoint titles as hints, not stable tool names.
- Extract the current REST method and path from the OpenAPI block on the docs page.
- Use examples from the docs page only after replacing sample identifiers with user-provided or resolved identifiers.

## Output Guidance

- For discovery tasks, return ranked candidates with key evidence and next-step enrichment suggestions.
- For detail tasks, return a compact entity profile plus important raw identifiers.
- For trend/ranking tasks, state the metric, time window, market, and any API coverage limitations.
- For reports, organize findings by entity, performance signals, risks, and recommended follow-up calls.
