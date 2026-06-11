# Routing Policy

## Decision Order

1. If the user names an exact entity identifier, start with the detail endpoint or an identifier resolver.
2. If the user provides a keyword or broad topic, start with search/list endpoints.
3. If the user asks for best/top/ranking/growth/trending, prefer ranking, trend, best-seller, or insight endpoints when the docs provide them.
4. If the user asks why something performed well, combine detail, trend, comment/review, and related-entity endpoints.
5. If a comprehensive report would require many adjacent calls, confirm the sections before executing all of them.

## Endpoint Selection

- Prefer one precise endpoint over a broad endpoint plus manual filtering.
- Prefer documented API filtering over client-side filtering when available.
- Do not expose raw endpoint names first for non-technical users; translate intent into a workflow.
- If the user asks for API integration details, answer with method, path, auth, required params, and a minimal request example from the current docs.

## Multi-Step Composition

Use composed workflows when one endpoint cannot answer the request:

- Resolve identifiers before detail or related-entity calls.
- Search/list first, then enrich shortlisted results with detail endpoints.
- Fetch trend/ranking data only after the target entity and metric are clear.
- For comparison, normalize metrics and date windows before ranking results.

## Stop Conditions

Stop collecting pages or related endpoints when:

- the user's requested top N or scope is satisfied
- no next page/cursor exists
- `has_more` is false
- the extra calls would add low-value noise
- the user has not approved a broad report workflow
