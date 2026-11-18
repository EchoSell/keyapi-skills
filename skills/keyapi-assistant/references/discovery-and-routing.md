# Discovery And Routing

## Discovery Sequence

Use this sequence whenever the exact current operation is not already verified in the current task:

1. Infer the likely platform from the user's named service and business entity.
2. Run `node scripts/discover-keyapi.mjs --list-platforms` if the platform identifier is uncertain or support must be confirmed.
3. Run `node scripts/discover-keyapi.mjs --platform <platform> --limit 10 --offset 0`.
4. Compare each endpoint's `summary`, `description`, `tags`, `path`, `method`, and documented parameters against the user's goal.
5. If no endpoint is suitable and `has_more` is true, add the returned `limit` to `offset` and inspect the next page.
6. After selecting a path, run `node scripts/discover-keyapi.mjs --platform <platform> --endpoint-path <complete-path>`.
7. Use the resolved operation's exact method, query/path parameters, `requestBody`, required fields, enums, and examples to construct the request.

Do not guess an endpoint path or stop after the first page when more pages are available. Do not treat a remembered path, endpoint title, translated user phrase, or documentation URL as the API contract.

## Semantic Selection

Endpoint routing is a semantic decision made from the user's intent and current metadata, not a fixed keyword table. Identify:

- platform and entity
- requested action: search, detail, list, resolve, rank, trend, compare, or monitor
- identifier type and available identifier
- requested filters, region, time range, ordering, and depth
- whether one operation is enough or a composed workflow is required

Prefer the endpoint that directly returns the requested entity and supports the strongest relevant server-side filters. When multiple candidates remain plausible, resolve their complete operations and compare required inputs before asking the user.

## Input Collection

Ask only for required values that are absent and cannot be inferred safely. Never substitute an example or default from OpenAPI without telling the user when it materially changes scope, region, cost, or result meaning.

Place values according to the resolved operation:

- `in: query` -> repeated `--query-param key=value` or `--query-file`
- path placeholders -> substitute only the documented path parameter value into `--path`
- JSON `requestBody` -> `--body-file` or a small `--body`
- image content -> `--image-file` and the documented field name

## Composed Workflows

Use multiple calls only when the user's result requires dependent operations, such as search then detail, identifier resolution then content lookup, or list then comparison. Reuse identifiers returned by the preceding operation, preserve pagination semantics per endpoint, and bound broad workflows before spending significant quota.
