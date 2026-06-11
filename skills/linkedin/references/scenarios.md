# Scenarios

Use these scenario cards to map user intent to documentation search terms. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

people, profiles, companies, posts, comments, videos, images, experience, education, skills, certifications, publications, honors, recommendations, interests, jobs, employees

## Common Scenarios

- Professional profile due diligence
- Company profile and employee discovery
- Company posts and hiring intelligence
- Job list, job count, and job detail analysis
- People search and professional network research

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `linkedin` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested entity family and workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from detail, search/list, ranking/trend, resolver, and related-entity endpoints only when the docs support them.
5. For freshness-sensitive requests, search for docs terms such as `latest`, `recent`, `current`, `trend`, or `realtime` only when those variants exist for LinkedIn.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, ranking, comparison, monitoring, or report
- Entity: people, profiles, companies, posts, comments, videos, images, experience, education, skills, certifications, publications, honors, recommendations, interests, jobs, employees
- Scope: person, company, job, post, keyword, location, role, seniority, company size, and hiring context
- Sort or metric: relevance, recency, company size, employee count, hiring activity, role fit, post engagement
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
