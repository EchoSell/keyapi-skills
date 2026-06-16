---
name: keyapi-youtube
description: Analyze YouTube videos and channels through the KeyAPI REST API using live official docs. Use for video information, comments, sub-comments, streams, related videos, Shorts search, video search, trending videos, channel description, channel videos, channel ID/URL conversion, channel search, filtered search, and search suggestions.
---

# YouTube KeyAPI Skill

Turn natural-language YouTube requests into documentation-guided KeyAPI REST workflows. Start from the user's business goal, map it to the closest scenario, verify the current endpoint contract in the latest KeyAPI docs, then execute the request with a helper script when available or with direct REST when it is not.

## Execution Contract

- Use KeyAPI REST API execution for live data lookup, ranking, analysis, search, comparison, and reporting.
- Treat `https://docs.keyapi.ai/llms.txt` and linked endpoint pages as the source of truth for method, `/v1/...` path, parameters, enums, pagination, request body, and response shape.
- Do not use platform web pages or manual browsing as a substitute for API data.
- Keep credentials local. Never print or restate `KEYAPI_TOKEN`.
- If official docs conflict with this skill, follow the official docs.

## Workflow

1. Apply `references/global-rules.md` as the base execution contract.
2. Check auth with `node scripts/configure-keyapi-auth.mjs --status` when script execution is available and setup state is unknown.
3. If credentials are missing, stop live execution, load `references/setup-and-auth.md`, and tell the user the exact setup command: `node scripts/configure-keyapi-auth.mjs`. Do not only say "set KEYAPI_TOKEN".
4. Identify the user's goal, entity, scope, metric, pagination depth, and desired output.
5. Use `references/scenarios.md` to map the request to a YouTube scenario.
6. Use `references/routing-policy.md` to choose search/list, detail, resolver, ranking/trend, related-entity, or composed workflow patterns.
7. Apply `references/youtube-rules.md` for YouTube-specific identifiers, pagination, and reporting rules.
8. Load the scenario reference named in `references/scenarios.md` when the request maps to a curated scenario.
9. Search current docs with `node scripts/search-keyapi-docs.mjs --query "<entity action>"` when the helper script is available; otherwise open `https://docs.keyapi.ai/llms.txt` directly.
10. Open the selected docs page and extract the current OpenAPI method, path, parameters, examples, and response contract.
11. Ask only for missing high-value inputs that cannot be safely defaulted.
12. Prefer `node scripts/keyapi-api.mjs` for live REST calls when script execution is available. Use the host's HTTP client only when scripts are unavailable or the helper cannot express the documented request.
13. Check HTTP status and KeyAPI response envelope. `code = 0` means success; non-zero `code` is an API-level failure.
14. Return the result in user-facing analytical language, separating observed API facts from inference.

## Input Model

Compress parameter-heavy APIs into these decision fields:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: the YouTube object being searched, analyzed, compared, ranked, or monitored
- Scope: video/channel URL or ID, keyword, region, language, category, publish window, comment scope, and continuation depth
- Metric or sort: views, likes, comments, publish date, subscriber count, duration, relevance, trend position
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: concise answer, table, raw JSON, or structured report

## Scenario Families

- Inspect video metadata, engagement, streams, and related videos
- Analyze comments and nested replies
- Search videos, Shorts, or trending videos
- Resolve channel ID, URL, handle, and description
- Collect channel videos and search within YouTube channels

## KeyAPI-Specific Usage

- Prefer API-side filters from the current docs over client-side filtering.
- If multiple endpoints could solve the task, choose the one with the least user input burden and strongest documented filtering.
- For broad reports, confirm the requested sections before launching a multi-endpoint workflow.
- For YouTube reporting, separate videos, Shorts, comments, sub-comments, streams, related videos, formats, channel metadata, and search/trending context.
- If the user asks about integration details, answer with method, path, auth, required params, and a minimal request example from the current docs.

## Onboarding Rule

When the user has not set up credentials yet, proactively provide the setup script command. Do not answer only with "configure KEYAPI_TOKEN".

When credentials are missing:

- explain that KeyAPI uses Bearer token authentication with `KEYAPI_TOKEN`
- point them to the KeyAPI dashboard and auth docs
- require local setup with `node scripts/configure-keyapi-auth.mjs` when script execution is available
- also mention `node scripts/configure-keyapi-auth.mjs --status` for checking whether setup is already visible to the current session
- explain that setup writes credentials into shell environment variables
- ask them to restart Codex or Claude Code, or open a new terminal session after setup
- continue live requests only after setup is complete

## Script Contract

This skill includes helper scripts under `scripts/` for reliable local execution:

- `scripts/configure-keyapi-auth.mjs`
- `scripts/search-keyapi-docs.mjs`
- `scripts/keyapi-api.mjs`

Run script commands from this skill directory. If the host agent uses a different current working directory, resolve `scripts/...` relative to this `SKILL.md`. For large JSON bodies, especially base64 image payloads, prefer `--body-file` or `--image-file` instead of inline `--body`.

Prefer them in this order when script execution is available:

1. auth status
2. docs lookup when endpoint details are unclear
3. live REST call

If script execution is unavailable in the host agent, or if the helper cannot express the documented request, do not fail the task. Use the same documented REST method, path, headers, query, and body with the host's available HTTP client.

## Script Examples

Search docs for this platform:

```bash
node scripts/search-keyapi-docs.mjs --query "<entity action>"
```

Execute a documented GET endpoint:

```bash
node scripts/keyapi-api.mjs --path /v1/youtube/... --query '{"example":"value"}'
```

Execute a documented POST endpoint:

```bash
node scripts/keyapi-api.mjs --path /v1/youtube/... --method POST --body '{"example":"value"}'
```

Execute a documented POST endpoint with a large JSON body:

```bash
node scripts/keyapi-api.mjs --path /v1/youtube/... --method POST --body-file request.json
```

Execute an image JSON endpoint from a local file:

```bash
node scripts/keyapi-api.mjs --path /v1/youtube/... --method POST --image-file ./image.jpg --image-field image_base64
```

## References

- `references/global-rules.md`
- `references/scenarios.md`
- `references/routing-policy.md`
- `references/youtube-rules.md`
- `references/youtube-video-rules.md`
- `references/youtube-channel-rules.md`
- `references/youtube-search-trends-rules.md`
- `references/setup-and-auth.md`
