---
name: keyapi-threads
description: Discover and analyze Threads users and content through the KeyAPI REST API using live official docs. Use for user profiles, posts, reposts, replies, post details, comments, and keyword search across top content, recent content, and profiles.
---

# Threads KeyAPI Skill

This skill turns Threads KeyAPI HTTP calls into scenario-based workflows for non-technical users.

Do not start by listing raw endpoints or dumping all parameters. First identify the user's business goal, choose the closest scenario, collect only the missing inputs, map them to the latest documented KeyAPI parameters, and execute the request through the local repository script when available.

Before any live API call, check setup status with `node ./configure-keyapi-auth.mjs --status`.
If KeyAPI auth is missing, stop and route to `references/setup-and-auth.md`.
Always apply the lowest-level rules from `references/global-rules.md`.
Apply `references/threads-rules.md` for Threads-specific entity, identifier, pagination, and output rules.

## Hard Rule

For any data lookup, ranking, analysis, search, comparison, or reporting task, use KeyAPI REST API execution only.

Do not browse, inspect, scrape, or navigate platform web pages to answer user data requests.

Platform websites may only be referenced for:

- registration or account guidance
- public context when the user explicitly asks for non-API background
- auth setup guidance for KeyAPI itself

They are not an allowed substitute for KeyAPI API execution.

## Workflow

1. Read `references/global-rules.md` mentally as the base contract.
2. Run `node ./configure-keyapi-auth.mjs --status` if setup state is unknown.
3. If credentials are missing, route to `references/setup-and-auth.md`.
4. Identify the user's goal in plain language.
5. Match the request to a scenario in `references/scenarios.md`.
6. Use `references/routing-policy.md` to decide whether to use search/list endpoints, detail endpoints, ranking/trend endpoints, resolver endpoints, or a composed multi-step workflow.
7. Apply `references/threads-rules.md` before choosing identifiers, pagination fields, freshness mode, and output format.
8. If the user asks for a comprehensive report, confirm which related data sections should be included before launching a broad multi-endpoint workflow.
9. Ask only for missing high-value inputs if the scenario cannot run safely with defaults.
10. Search the latest KeyAPI docs with `node ./search-keyapi-docs.mjs --platform threads --query "<entity action>"` when endpoint paths, parameters, enums, or pagination are unclear.
11. Open the selected docs page from `https://docs.keyapi.ai/llms.txt` and extract the current OpenAPI method, `/v1/...` path, required parameters, optional filters, examples, and response shape.
12. Execute the chosen endpoint through `node ./keyapi-api.mjs` when tool execution is available.
13. If tool execution is unavailable, use the same documented REST method and path with the host's HTTP client.
14. Check HTTP status and the KeyAPI response envelope. `code = 0` means success; non-zero `code` is an API-level failure.
15. Return the result in business language, not raw API language, unless the user asks for integration details.

## Interaction Rules

- Prefer scenario names such as `search`, `detail`, `ranking`, `comparison`, `trend monitoring`, and `reporting` over raw endpoint names.
- Hide low-level parameters unless the user explicitly asks for advanced control.
- If an endpoint has many parameters, expose at most 3 to 5 user-facing inputs first.
- Fill the rest with defaults, derived values, or scenario presets from the current docs.
- If multiple endpoints could solve the task, choose the one with the least user input burden and strongest API-side filtering.
- When the user's request is vague, offer 2 to 4 scenario options instead of asking an open question.
- If the user asks about API usage, endpoint meaning, auth, limits, or data freshness, answer from the official docs as well as from execution results when relevant.
- Treat the full KeyAPI docs set as available capability, not only endpoints remembered in this skill.
- Never use platform web app pages as the source of truth for analytics results.
- If the user asks for actual data, the correct behavior is `route -> map params -> execute script`, not manual website exploration.
- If credentials are missing, pause and ask for setup completion instead of falling back to browsing.

## Input Compression Strategy

For parameter-heavy APIs, do not mirror the raw schema directly. Compress inputs into these layers:

- Goal: what the user wants to achieve
- Entity: the platform object being searched, analyzed, compared, ranked, or monitored
- Scope: market, language, category, date range, region, keyword, account, URL, or identifier
- Sort preference: newest, hottest, relevance, highest engagement, highest sales, fastest growth, rating, or API-supported metric
- Optional advanced filters: only when clearly useful
- Execution mode: single lookup, search/list, ranking/trend, enrichment workflow, or multi-step report

## Scenario Selection

Read `references/scenarios.md` to choose the best scenario card.

If no exact scenario fits:

- use the nearest scenario with a note about assumptions, or
- fall back to an advanced mode that exposes more filters gradually

## Scenario Families

- Resolve and inspect a Threads user
- Collect user posts, reposts, and replies
- Fetch post details and comments
- Search top or recent content by keyword
- Search user profiles by keyword

## Authoritative Sources

The authoritative behavior lives in:

- `references/global-rules.md`
- `references/threads-rules.md`
- `references/routing-policy.md`
- `references/scenarios.md`
- the official KeyAPI docs index: `https://docs.keyapi.ai/llms.txt`

Do not maintain a second handwritten parameter source of truth if the official docs already define it.

## Onboarding Rule

When the user has not set up credentials yet:

- explain that KeyAPI uses Bearer token authentication with `KEYAPI_TOKEN`
- direct the user to register or retrieve the token from the KeyAPI dashboard
- require them to run `node ./configure-keyapi-auth.mjs`
- tell them the setup script will write KeyAPI credentials into shell environment variables
- ask them to restart Codex or Claude Code, or open a new terminal session after setup
- only continue to live requests after setup is complete

## Script Contract

This skill assumes these repository scripts exist:

- `./configure-keyapi-auth.mjs`
- `./search-keyapi-docs.mjs`
- `./keyapi-api.mjs`

Use them in this order when possible:

1. auth status
2. docs lookup when parameters are unclear
3. live call

## Script Examples

Search docs for this platform:

```bash
node ./search-keyapi-docs.mjs --platform threads --query "<entity action>"
```

Execute a documented GET endpoint:

```bash
node ./keyapi-api.mjs --path /v1/threads/... --query '{"example":"value"}'
```

Execute a documented POST endpoint:

```bash
node ./keyapi-api.mjs --path /v1/threads/... --method POST --body '{"example":"value"}'
```
