# Google Rules

## Entity Scope

queries, images, videos, places, maps, reviews, news, shopping results, Lens URLs, scholar results, patents, webpages

## Platform-Specific Rules

- Most Google search endpoints use q plus gl and hl; confirm exact names from docs.
- Reviews often use token pagination rather than numeric page pagination.
- For time filtering, confirm supported tbs values from the current docs before use.

## Scenario Module Routing

- Use `google-search-extraction-rules.md` for web search, images, videos, Lens, places, maps, reviews, news, shopping, scholar, patents, autocomplete, and webpage extraction.
- If a request spans multiple Google surfaces, load the same module and choose the narrowest vertical endpoint before falling back to generic search.

## Documentation Hints

- Filter `https://docs.keyapi.ai/llms.txt` for links under `https://docs.keyapi.ai/google/`.
- Treat endpoint titles as hints, not stable tool names.
- Extract the current REST method and path from the OpenAPI block on the docs page.
- Use examples from the docs page only after replacing sample identifiers with user-provided or resolved identifiers.

## Output Guidance

- For discovery tasks, return ranked candidates with key evidence and next-step enrichment suggestions.
- For detail tasks, return a compact entity profile plus important raw identifiers.
- For trend/ranking tasks, state the metric, time window, market, and any API coverage limitations.
- For reports, organize findings by entity, performance signals, risks, and recommended follow-up calls.
