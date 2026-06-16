# Global Rules

These rules apply to every Google KeyAPI REST workflow.

## Source Of Truth

- Documentation index: `https://docs.keyapi.ai/llms.txt`
- API base URL: `https://api.keyapi.ai`
- Authentication: `Authorization: Bearer $KEYAPI_TOKEN`
- Always read the current docs page for the selected endpoint before deciding final parameters.
- If this skill text conflicts with the official docs, follow the official docs.

## REST Execution

- Use the documented method, path, query parameters, and JSON body from the current docs page.
- Prefer the skill-local helper scripts under `scripts/` for local execution; the current KeyAPI docs remain the API source of truth.
- Use the host's available HTTP client only when helper scripts are unavailable or cannot express the documented request.
- Do not use gateway tool schemas or remembered MCP tool definitions as the source of truth.
- Do not navigate platform web apps as a fallback for API data.

## Parameter Discipline

- Include required parameters exactly as documented.
- Do not send empty optional parameters.
- Confirm enum values, date windows, sort values, country/region codes, and pagination fields from the endpoint docs.
- When identifiers are ambiguous, resolve them first through the documented resolver/search/detail endpoint.

## Response Handling

- Check HTTP status first.
- Then check KeyAPI response envelope when present:
  - `code = 0`: success
  - non-zero `code`: API-level error; report the message and adjust inputs if appropriate
- For missing credentials or `401`, load `references/setup-and-auth.md` and give the exact setup command `node scripts/configure-keyapi-auth.mjs`; also mention `node scripts/configure-keyapi-auth.mjs --status` for checking current visibility.
- For `402` or quota messages, explain that the request needs available credits or plan access.
- For `429`, wait or reduce request rate.
- For `500`, retry once for idempotent requests before reporting failure.

## Pagination

- Use the pagination shape documented for the exact endpoint.
- Numeric pagination may use `page`, `page_num`, `page_size`, `limit`, `offset`, or similar fields.
- Cursor pagination must use the cursor returned by the previous response.
- Stop when the response has no items, `has_more` is false, no next cursor exists, or the requested scope is satisfied.

## Reporting

- Summarize the answer in the user's language.
- Cite which endpoint family was used when relevant.
- For multi-endpoint workflows, separate observed API facts from analytical inference.
