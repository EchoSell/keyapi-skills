# Global Rules

These rules apply to every LinkedIn KeyAPI REST workflow.

## Source of Truth

- Documentation index: `https://docs.keyapi.ai/llms.txt`
- API base URL: `https://api.keyapi.ai`
- Authentication: `Authorization: Bearer $KEYAPI_TOKEN`
- Always read the current docs page for the selected endpoint before deciding final parameters.
- If this skill text conflicts with the official docs, follow the official docs.

## Direct REST Only

- Do not use a repo-local execution wrapper.
- Do not use gateway tool schemas as the source of truth.
- Do not navigate platform web apps as a fallback for data.
- Use direct HTTP calls with documented method, path, query parameters, and JSON body.

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
- For `401`, ask the user to configure `KEYAPI_TOKEN`.
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
