# YouTube Rules

## Entity Scope

videos, comments, sub-comments, streams, related videos, shorts, channels, channel IDs, channel URLs, suggestions, trending videos

## Platform-Specific Rules

- Resolve video_id and channel_id before downstream calls.
- Channel URL, channel ID, and handle conversion are separate workflows.
- Continuation tokens often drive YouTube pagination; do not invent numeric pages if docs use tokens.

## Documentation Hints

- Filter `https://docs.keyapi.ai/llms.txt` for links under `https://docs.keyapi.ai/youtube/`.
- Treat endpoint titles as hints, not stable tool names.
- Extract the current REST method and path from the OpenAPI block on the docs page.
- Use examples from the docs page only after replacing sample identifiers with user-provided or resolved identifiers.

## Output Guidance

- For discovery tasks, return ranked candidates with key evidence and next-step enrichment suggestions.
- For detail tasks, return a compact entity profile plus important raw identifiers.
- For trend/ranking tasks, state the metric, time window, market, and any API coverage limitations.
- For reports, organize findings by entity, performance signals, risks, and recommended follow-up calls.
