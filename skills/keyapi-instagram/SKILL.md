---
name: keyapi-instagram
description: Discover and analyze Instagram users and content through the KeyAPI REST API using live official docs. Use for profiles, posts, Reels, Stories, Highlights, followers, following, tagged content, reposts, comments, hashtags, music, Explore sections, locations, and search.
---

# Instagram KeyAPI Skill

Turn natural-language Instagram requests into documentation-guided KeyAPI REST workflows. Start from the user's business goal, map it to the closest scenario, verify the current endpoint contract in the latest KeyAPI docs, then execute the request with a helper script when available or with direct REST when it is not.

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
5. Use `references/scenarios.md` to map the request to a Instagram scenario.
6. Use `references/routing-policy.md` to choose search/list, detail, resolver, ranking/trend, related-entity, or composed workflow patterns.
7. Apply `references/instagram-rules.md` for Instagram-specific identifiers, pagination, and reporting rules.
8. Load the scenario reference named in `references/scenarios.md` when the request maps to a curated scenario.
9. Resolve current docs with `node scripts/search-keyapi-docs.mjs --query "<entity action>" --resolve` when the helper script is available; otherwise open `https://docs.keyapi.ai/llms.txt` and the selected endpoint page directly.
10. Use the resolver output or opened docs page to extract the current OpenAPI method, `/v1/...` path, required query/body parameters, examples, and response contract before any live API call. Never infer API paths from docs URLs, scenario names, endpoint titles, remembered routes, or a previous 404.
11. Ask only for missing high-value inputs that cannot be safely defaulted.
12. Prefer `node scripts/keyapi-api.mjs` for live REST calls when script execution is available. Use the host's HTTP client only when scripts are unavailable or the helper cannot express the documented request.
13. Check HTTP status and KeyAPI response envelope. `code = 0` means success; non-zero `code` is an API-level failure.
14. Return the result in user-facing analytical language, separating observed API facts from inference.

## Input Model

Compress parameter-heavy APIs into these decision fields:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: the Instagram object being searched, analyzed, compared, ranked, or monitored
- Scope: username/user ID, post/Reel/Story/Highlight URL or ID, hashtag, music, location, language, and date window
- Metric or sort: recency, likes, comments, views, plays, follower fit, hashtag volume, creator similarity
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: concise answer, table, raw JSON, or structured report

## Scenario Families

- User profile and content library analysis
- Follower/following and related-user exploration
- Post, comment, like, and reply analysis
- Hashtag, Reel, music, Explore, and location discovery
- Shortcode/media ID conversion workflows

## KeyAPI-Specific Usage

- Prefer API-side filters from the current docs over client-side filtering.
- If multiple endpoints could solve the task, choose the one with the least user input burden and strongest documented filtering.
- For broad reports, confirm the requested sections before launching a multi-endpoint workflow.
- For Instagram reporting, separate account, content, hashtag, music, location, follower/following, Story, Highlight, and tagged-content evidence.
- If the user asks about integration details, answer with method, path, auth, required params, and a minimal request example from the current docs.

## Onboarding Rule

When the user has not set up credentials yet, proactively provide the setup script command. Do not answer only with "configure KEYAPI_TOKEN".

When credentials are missing:

- explain that KeyAPI uses Bearer token authentication with `KEYAPI_TOKEN`
- point them to the KeyAPI dashboard and auth docs
- require local setup with `node scripts/configure-keyapi-auth.mjs` when script execution is available
- also mention `node scripts/configure-keyapi-auth.mjs --status` for checking whether setup is already visible to the current session
- explain that setup writes credentials into shell environment variables
- explain that `keyapi-api.mjs` also checks the managed shell profile, so retrying may work without restarting; restart Codex or Claude Code only if needed
- continue live requests only after setup is complete

## Script Contract

This skill includes helper scripts under `scripts/` for reliable local execution:

- `scripts/configure-keyapi-auth.mjs`
- `scripts/search-keyapi-docs.mjs`
- `scripts/keyapi-api.mjs`

Run script commands from this skill directory. If the host agent uses a different current working directory, resolve `scripts/...` relative to this `SKILL.md`. For large JSON bodies, especially base64 image payloads, prefer `--body-file` or `--image-file` instead of inline `--body`.

Prefer them in this order when script execution is available:

1. auth status
2. docs resolution before live REST calls
3. live REST call

If script execution is unavailable in the host agent, or if the helper cannot express the documented request, do not fail the task. Use the same documented REST method, path, headers, query, and body with the host's available HTTP client.

## Script Examples

Resolve current docs for this platform:

```bash
node scripts/search-keyapi-docs.mjs --query "<entity action>" --resolve
```

Execute a documented GET endpoint:

```bash
node scripts/keyapi-api.mjs --path /v1/instagram/... --query '{"example":"value"}'
```

Execute a documented POST endpoint:

```bash
node scripts/keyapi-api.mjs --path /v1/instagram/... --method POST --body '{"example":"value"}'
```

Execute a documented POST endpoint with a large JSON body:

```bash
node scripts/keyapi-api.mjs --path /v1/instagram/... --method POST --body-file request.json
```

Execute an image JSON endpoint from a local file:

```bash
node scripts/keyapi-api.mjs --path /v1/instagram/... --method POST --image-file ./image.jpg --image-field image_base64
```

## References

- `references/global-rules.md`
- `references/scenarios.md`
- `references/routing-policy.md`
- `references/instagram-rules.md`
- `references/instagram-user-rules.md`
- `references/instagram-content-rules.md`
- `references/instagram-discovery-rules.md`
- `references/setup-and-auth.md`
