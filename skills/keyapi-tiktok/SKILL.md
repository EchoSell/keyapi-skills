---
name: keyapi-tiktok
description: Analyze TikTok creators, TikTok Shop commerce, content, live streams, trends, ads, products, shops, categories, videos, hashtags, music, comments, and audience signals through the KeyAPI REST API using live official docs. Use for influencer discovery, shop creator analysis, product and seller research, video intelligence, live commerce, trend monitoring, and multi-endpoint reports.
---

# TikTok KeyAPI Skill

Turn natural-language TikTok requests into documentation-guided KeyAPI REST workflows. Start from the user's business goal, map it to the closest scenario, verify the current endpoint contract in the latest KeyAPI docs, then execute the request with a helper script when available or with direct REST when it is not.

## Execution Contract

- Use KeyAPI REST API execution for live data lookup, ranking, analysis, search, comparison, and reporting.
- Treat `https://docs.keyapi.ai/llms.txt` and linked endpoint pages as the source of truth for method, `/v1/...` path, parameters, enums, pagination, request body, and response shape.
- Do not use platform web pages or manual browsing as a substitute for API data.
- Keep credentials local. Never print or restate `KEYAPI_TOKEN`.
- If official docs conflict with this skill, follow the official docs.

## Workflow

1. Apply `references/global-rules.md` as the base execution contract.
2. Check auth with `node scripts/configure-keyapi-auth.mjs --status` when script execution is available and setup state is unknown.
3. If credentials are missing, stop live execution and route to `references/setup-and-auth.md`.
4. Identify the user's goal, entity, scope, metric, pagination depth, and desired output.
5. Use `references/scenarios.md` to map the request to a TikTok scenario.
6. Use `references/routing-policy.md` to choose search/list, detail, resolver, ranking/trend, related-entity, or composed workflow patterns.
7. Apply `references/tiktok-rules.md` for TikTok-specific identifiers, pagination, and reporting rules.
8. Search current docs with `node scripts/search-keyapi-docs.mjs --query "<entity action>"` when the helper script is available; otherwise open `https://docs.keyapi.ai/llms.txt` directly.
9. Open the selected docs page and extract the current OpenAPI method, path, parameters, examples, and response contract.
10. Ask only for missing high-value inputs that cannot be safely defaulted.
11. Execute with `node scripts/keyapi-api.mjs` when available, or call the same documented REST endpoint with the host's HTTP client.
12. Check HTTP status and KeyAPI response envelope. `code = 0` means success; non-zero `code` is an API-level failure.
13. Return the result in user-facing analytical language, separating observed API facts from inference.

## Input Model

Compress parameter-heavy APIs into these decision fields:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: the TikTok object being searched, analyzed, compared, ranked, or monitored
- Scope: country/region, category, keyword, creator/product/shop/video/hashtag/music/live identifier, and date window
- Metric or sort: GMV, sales, views, likes, comments, shares, engagement rate, follower growth, ranking position
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: concise answer, table, raw JSON, or structured report

## Scenario Families

- Find and benchmark creators or shop creators
- Analyze creator profile, growth, videos, products, live history, audience, and rankings
- Research TikTok Shop products, shops, categories, reviews, related creators, videos, and live sessions
- Analyze videos, comments, hashtags, music, and live streams
- Monitor trending hashtags, music, videos, ads, products, and keyword insights

## KeyAPI-Specific Usage

- Prefer API-side filters from the current docs over client-side filtering.
- If multiple endpoints could solve the task, choose the one with the least user input burden and strongest documented filtering.
- For broad reports, confirm the requested sections before launching a multi-endpoint workflow.
- For TikTok reporting, distinguish creator, shop creator, product, shop, category, video, hashtag, music, live, ad, and trend signals.
- If the user asks about integration details, answer with method, path, auth, required params, and a minimal request example from the current docs.

## Onboarding Rule

When the user has not set up credentials yet:

- explain that KeyAPI uses Bearer token authentication with `KEYAPI_TOKEN`
- point them to the KeyAPI dashboard and auth docs
- require local setup with `node scripts/configure-keyapi-auth.mjs` when script execution is available
- explain that setup writes credentials into shell environment variables
- ask them to restart Codex or Claude Code, or open a new terminal session after setup
- continue live requests only after setup is complete

## Script Contract

This skill includes helper scripts under `scripts/` for reliable local execution:

- `scripts/configure-keyapi-auth.mjs`
- `scripts/search-keyapi-docs.mjs`
- `scripts/keyapi-api.mjs`

Run script commands from this skill directory. If the host agent uses a different current working directory, resolve `scripts/...` relative to this `SKILL.md`.

Use them in this order when script execution is available:

1. auth status
2. docs lookup when endpoint details are unclear
3. live REST call

If script execution is unavailable in the host agent, do not fail the task. Use the same documented REST method, path, headers, query, and body with the host's available HTTP client.

## Script Examples

Search docs for this platform:

```bash
node scripts/search-keyapi-docs.mjs --query "<entity action>"
```

Execute a documented GET endpoint:

```bash
node scripts/keyapi-api.mjs --path /v1/tiktok/... --query '{"example":"value"}'
```

Execute a documented POST endpoint:

```bash
node scripts/keyapi-api.mjs --path /v1/tiktok/... --method POST --body '{"example":"value"}'
```

## References

- `references/global-rules.md`
- `references/scenarios.md`
- `references/routing-policy.md`
- `references/tiktok-rules.md`
- `references/setup-and-auth.md`
