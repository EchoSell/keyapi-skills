# Global Rules

## Source Of Truth

Use the current KeyAPI platform index, paginated endpoint discovery, and resolved OpenAPI operation as the API contract. Static examples are command-shape examples only.

## Request Construction

- Use the exact discovered HTTP method and complete `/v1/...` path.
- Send only documented query, path, and body fields.
- Omit empty optional values.
- Prefer repeated `--query-param key=value` for scalar query values because it is stable across PowerShell, macOS, and Linux shells.
- Query sources merge in this order: `--query`, `--query-file`, then repeated `--query-param`; later values override earlier values.
- Arrays and objects in JSON query sources remain structured and are encoded by the helper.
- Use `--body-file` for large or shell-sensitive JSON. Use `--image-file` instead of embedding large base64 strings in a shell command.

## Execution

Prefer `node scripts/call-keyapi.mjs` for API calls. Use another HTTP client only when the included helper cannot be executed or cannot express the resolved operation.

Examples:

```bash
node scripts/call-keyapi.mjs --path /v1/instagram/... --query-param username=example
node scripts/call-keyapi.mjs --path /v1/amazon/... --method POST --body-file request.json
node scripts/call-keyapi.mjs --path /v1/tiktok/... --method POST --query-param region=US --image-file image.jpg --image-field image_base64
```

## Success And Failure

- Preserve existing HTTP behavior: non-2xx responses are failures.
- For HTTP 2xx JSON responses, numeric `code: 0` is success and numeric non-zero `code` is failure.
- On failure, preserve and report the returned `message`; it explains missing parameters, invalid credentials, insufficient quota, rate limits, or server failures.
- If a 2xx response is not JSON or has no numeric `code`, retain the HTTP-based behavior.
- Never expose the API Key in commands, logs, files, or answers.

## Result Shape And Large Responses

The helper result stores the API response envelope under `data`. For a normal KeyAPI envelope, the business payload path is `data.data`.

Large responses may return a stdout preview. If complete fields are required for extraction, sorting, aggregation, or validation, add `--output-file <path>` and read the full helper result from that file. Internal analysis files should use an OS temporary directory or workspace `.tmp-keyapi-*.json` path and are not user deliverables.

Use `--stdout full` only when full JSON in stdout is specifically useful. When the user asks to save or export data, choose an intentional output path and treat it as the delivered file.

## Pagination And Reporting

- Discovery pagination and business endpoint pagination are separate contracts.
- Follow each resolved operation's documented cursor, offset, token, page, or time-based pagination field.
- Do not claim exhaustive coverage after one page unless the response proves completion.
- Separate API-observed facts from calculations and inference.
- State relevant platform, region, time range, ranking basis, and coverage limits in analytical results.
