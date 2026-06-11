---
name: keyapi-pinterest
description: Discover and analyze Pinterest users, pins, boards, followers, and following through the KeyAPI REST API using live official docs. Use for user search, profile information, pin libraries, board collections, and follower/following network traversal.
---

# Pinterest KeyAPI Skill

Turn natural-language Pinterest requests into documentation-guided KeyAPI REST workflows. Start from the user's business goal, map it to the closest scenario, verify the current endpoint contract in the latest KeyAPI docs, then execute the request with a helper script when available or with direct REST when it is not.

## Execution Contract

- Use KeyAPI REST API execution for live data lookup, ranking, analysis, search, comparison, and reporting.
- Treat `https://docs.keyapi.ai/llms.txt` and linked endpoint pages as the source of truth for method, `/v1/...` path, parameters, enums, pagination, request body, and response shape.
- Do not use platform web pages or manual browsing as a substitute for API data.
- Keep credentials local. Never print or restate `KEYAPI_TOKEN`.
- If official docs conflict with this skill, follow the official docs.

## Workflow

1. Apply `references/global-rules.md` as the base execution contract.
2. Check auth with `node ./configure-keyapi-auth.mjs --status` when working from this repository root and setup state is unknown.
3. If credentials are missing, stop live execution and route to `references/setup-and-auth.md`.
4. Identify the user's goal, entity, scope, metric, pagination depth, and desired output.
5. Use `references/scenarios.md` to map the request to a Pinterest scenario.
6. Use `references/routing-policy.md` to choose search/list, detail, resolver, ranking/trend, related-entity, or composed workflow patterns.
7. Apply `references/pinterest-rules.md` for Pinterest-specific identifiers, pagination, and reporting rules.
8. Search current docs with `node ./search-keyapi-docs.mjs --platform pinterest --query "<entity action>"` when the helper script is available; otherwise open `https://docs.keyapi.ai/llms.txt` directly.
9. Open the selected docs page and extract the current OpenAPI method, path, parameters, examples, and response contract.
10. Ask only for missing high-value inputs that cannot be safely defaulted.
11. Execute with `node ./keyapi-api.mjs` when available, or call the same documented REST endpoint with the host's HTTP client.
12. Check HTTP status and KeyAPI response envelope. `code = 0` means success; non-zero `code` is an API-level failure.
13. Return the result in user-facing analytical language, separating observed API facts from inference.

## Input Model

Compress parameter-heavy APIs into these decision fields:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: the Pinterest object being searched, analyzed, compared, ranked, or monitored
- Scope: user, board, pin URL or ID, keyword, topic, follower/following graph, and board context
- Metric or sort: relevance, recency, saves or repins when available, follower count, board size, pin volume
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: concise answer, table, raw JSON, or structured report

## Scenario Families

- Search Pinterest users by keyword
- Inspect user profile information
- Collect pins for a user or board
- Browse board collections
- Analyze follower/following networks

## KeyAPI-Specific Usage

- Prefer API-side filters from the current docs over client-side filtering.
- If multiple endpoints could solve the task, choose the one with the least user input burden and strongest documented filtering.
- For broad reports, confirm the requested sections before launching a multi-endpoint workflow.
- For Pinterest reporting, distinguish users, pins, boards, followers, following, and collection-level context.
- If the user asks about integration details, answer with method, path, auth, required params, and a minimal request example from the current docs.

## Onboarding Rule

When the user has not set up credentials yet:

- explain that KeyAPI uses Bearer token authentication with `KEYAPI_TOKEN`
- point them to the KeyAPI dashboard and auth docs
- require local setup with `node ./configure-keyapi-auth.mjs` when the repository scripts are available
- explain that setup writes credentials into shell environment variables
- ask them to restart Codex or Claude Code, or open a new terminal session after setup
- continue live requests only after setup is complete

## Script Contract

The repository root includes helper scripts for reliable local execution:

- `./configure-keyapi-auth.mjs`
- `./search-keyapi-docs.mjs`
- `./keyapi-api.mjs`

Use them in this order when they are available from the current working directory:

1. auth status
2. docs lookup when endpoint details are unclear
3. live REST call

If this platform skill has been installed without the repository root scripts, do not fail the task. Use the same documented REST method, path, headers, query, and body with the host's available HTTP client.

## Script Examples

Search docs for this platform:

```bash
node ./search-keyapi-docs.mjs --platform pinterest --query "<entity action>"
```

Execute a documented GET endpoint:

```bash
node ./keyapi-api.mjs --path /v1/pinterest/... --query '{"example":"value"}'
```

Execute a documented POST endpoint:

```bash
node ./keyapi-api.mjs --path /v1/pinterest/... --method POST --body '{"example":"value"}'
```

## References

- `references/global-rules.md`
- `references/scenarios.md`
- `references/routing-policy.md`
- `references/pinterest-rules.md`
- `references/setup-and-auth.md`
