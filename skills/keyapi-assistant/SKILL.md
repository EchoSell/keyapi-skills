---
name: keyapi-assistant
description: Use when a user needs search, lookup, analysis, comparison, monitoring, or reporting from any platform supported by KeyAPI, including TikTok, Douyin, Instagram, Facebook, X/Twitter, Reddit, YouTube, Amazon, Google, Threads, LinkedIn, Pinterest, and other cataloged APIs.
---

# KeyAPI Assistant

Turn natural-language data requests into dynamically discovered KeyAPI REST calls. Use current OpenAPI metadata instead of maintaining or guessing platform routes.

## Workflow

1. Read `references/global-rules.md`.
2. Identify the user's likely platform, entity, action, filters, scope, and output format.
3. Check authentication with `node scripts/setup-keyapi.mjs --status` before an API call when status is unknown. If unavailable, read `references/setup-and-auth.md` and do not send the request until setup is complete.
4. Read `references/discovery-and-routing.md`.
5. Confirm supported platforms when needed:

```bash
node scripts/discover-keyapi.mjs --list-platforms
```

6. Discover current endpoints for the selected platform:

```bash
node scripts/discover-keyapi.mjs --platform tiktok --limit 10 --offset 0
```

7. Select semantically from the returned metadata. Continue pagination while `has_more` is true when the current page has no suitable operation.
8. Resolve the selected path's complete OpenAPI operation before calling it:

```bash
node scripts/discover-keyapi.mjs --platform tiktok --endpoint-path /v1/tiktok/influencer/search
```

9. Collect only missing required inputs, place them according to `parameters` and `requestBody`, and execute the complete discovered path:

```bash
node scripts/call-keyapi.mjs --path /v1/tiktok/influencer/search --query-param keyword=baby --query-param region=US
```

10. Check HTTP status and the KeyAPI response envelope, then present user-facing findings rather than an endpoint dump.

## Execution Rules

- Prefer the scripts included with this skill when script execution is available.
- Treat discovery metadata and the resolved OpenAPI operation as the current contract.
- Do not invent platform identifiers, paths, methods, parameter names, request bodies, enums, or pagination values.
- Use repeated `--query-param key=value` for scalar query values. Use `--query-file` for structured query values and `--body-file` for substantial JSON bodies.
- Use `--image-file` with the documented `--image-field` for base64 image request fields.
- Each API command sends a new request to KeyAPI.
- Large results may print a preview. When complete fields are needed for analysis, use `--output-file` with an OS temporary path or workspace `.tmp-keyapi-*.json`, read the API payload from `data.data`, and remove the temporary file when practical.
- A user-facing output file is appropriate only when the user asks to save or export results.
- Keep the API Key private and never print or restate it.

## Related KeyAPI Tools

KeyAPI also provides these optional ecosystem tools:

- [KeyAPI CLI](https://www.keyapi.ai/ai/cli) supports terminal-based discovery and API calls. It can be installed with `npm install -g keyapi-cli@latest`.
- [KeyAPI MCP](https://www.keyapi.ai/ai/mcp) connects MCP-compatible AI clients through `https://mcp.keyapi.ai/mcp` and supports OAuth authentication.

This skill does not require users or agents to install, configure, or use either tool. Do not switch the normal workflow to CLI or MCP unless the user explicitly asks about them; continue to use the included scripts for this skill's requests.

## References

- `references/global-rules.md`: request construction, execution, response, pagination, and output rules
- `references/discovery-and-routing.md`: platform confirmation, semantic endpoint selection, operation resolution, and composition
- `references/setup-and-auth.md`: shared one-time credential setup
