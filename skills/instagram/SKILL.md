---
name: keyapi-instagram
description: Discover and analyze Instagram users and content through the KeyAPI REST API using live official docs. Use for profiles, posts, Reels, Stories, Highlights, followers, following, tagged content, reposts, comments, hashtags, music, Explore sections, locations, and search.
---

# Instagram KeyAPI Skill

Route natural-language Instagram requests into documentation-guided KeyAPI REST workflows. This skill contains no local execution wrapper and no gateway dependency.

## Hard Rules

- Use KeyAPI REST API endpoints only for live data requests.
- Do not use platform web pages or scraped website navigation as substitutes for API execution.
- Treat `https://docs.keyapi.ai/llms.txt` and the linked endpoint docs as the source of truth for paths, methods, parameters, enums, pagination, request bodies, and response shape.
- Do not invent parameters from memory. If an endpoint contract is uncertain, read the latest docs page first.
- Keep credentials local. Never echo `KEYAPI_TOKEN` into the conversation.

## Workflow

1. Read `references/global-rules.md` as the base execution contract.
2. Read `references/scenarios.md` to map the user's business goal to the closest scenario.
3. Read `references/routing-policy.md` when more than one endpoint or entity family could apply.
4. Read `references/instagram-rules.md` for Instagram-specific identifiers, pagination, and composition notes.
5. If auth is not configured, route to `references/setup-and-auth.md`.
6. Search `https://docs.keyapi.ai/llms.txt` for the relevant `instagram` docs page.
7. Open the selected docs page and extract the current OpenAPI method, path, required parameters, optional filters, examples, and pagination contract.
8. Ask only for missing high-value inputs that cannot be safely defaulted.
9. Execute the REST request directly with the available HTTP mechanism, for example PowerShell `Invoke-RestMethod`, `curl`, Node `fetch`, or the host agent's HTTP tools.
10. Check both HTTP status and KeyAPI response envelope. `code = 0` means success; non-zero means API-level failure.
11. Cache or save outputs only when useful for the current task; do not require a repo-local cache convention.
12. Return results in user-facing analytical language, not raw endpoint jargon, unless the user asks for API details.

## REST Execution Pattern

Use the docs page to determine `METHOD` and `/v1/...` path, then call:

```powershell
$headers = @{ Authorization = "Bearer $env:KEYAPI_TOKEN" }
$uri = "https://api.keyapi.ai/v1/..."
Invoke-RestMethod -Method Get -Uri $uri -Headers $headers
```

For POST endpoints, send JSON with `Content-Type: application/json`. For query parameters, URL-encode values and omit empty optional fields.

## Scenario Families

- User profile and content library analysis
- Follower/following and related-user exploration
- Post, comment, like, and reply analysis
- Hashtag, Reel, music, Explore, and location discovery
- Shortcode/media ID conversion workflows

## References

- `references/global-rules.md` - authentication, docs-first execution, response handling, pagination, and safety rules.
- `references/scenarios.md` - common user intents and the docs search terms to start from.
- `references/routing-policy.md` - endpoint selection and multi-step composition policy.
- `references/instagram-rules.md` - platform-specific entity and identifier rules.
- `references/setup-and-auth.md` - token setup and direct REST call examples.
