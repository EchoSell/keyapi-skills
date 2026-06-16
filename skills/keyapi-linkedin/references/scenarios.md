# Scenarios

Use these scenario cards to map user intent to documentation search terms and reference modules. They are routing hints only; the exact request contract must come from `https://docs.keyapi.ai/llms.txt` and the linked endpoint page.

## Core Entities

people, profiles, companies, posts, comments, videos, images, experience, education, skills, certifications, publications, honors, recommendations, interests, jobs, employees

## Common Scenarios

- LinkedIn User: people search, profile, about, contact, career background, credentials, activity, interests, and social signals.
- LinkedIn Company: company profile, employees, and company posts.
- LinkedIn Jobs: company job count, company jobs, and job detail.

## Scenario Modules

Load one of these modules after identifying the user's business goal:

| User intent | Reference module | Docs path family |
|---|---|---|
| People search, user profile/about/contact, experience, education, skills, certifications, publications, honors, recommendations, interests, posts, comments, media | `linkedin-user-rules.md` | `/linkedin/` |
| Company profile, company employees, company posts | `linkedin-company-rules.md` | `/linkedin/` |
| Company job count, company jobs, job detail | `linkedin-jobs-rules.md` | `/linkedin/` |

## Docs Search Strategy

1. Search `llms.txt` for the platform slug `linkedin` plus the entity and action from the user's request.
2. Prefer docs pages whose title and description match the requested person, company, or job workflow.
3. If multiple pages match, choose the narrowest endpoint that satisfies the request with the least post-processing.
4. For broad reports, compose a small workflow from profile, background, activity, company, and job endpoints only when the docs support them.
5. Use scenario modules as curated endpoint shortlists, but verify current endpoint contracts from the linked docs page before execution.

## User Input Compression

Compress parameter-heavy tasks into:

- Goal: search, detail, enrichment, hiring analysis, comparison, monitoring, or report
- Entity: people, profiles, companies, posts, comments, videos, images, experience, education, skills, certifications, publications, honors, recommendations, interests, jobs, employees
- Scope: profile URL/ID, company URL/ID, job ID, role, location, skill, date/activity scope, and pagination depth
- Sort or metric: relevance, recency, role match, hiring count, follower/connection count, or activity surface when supported
- Pagination depth: one page, top N, until enough evidence, or all available within the user's approved scope
- Output format: raw JSON, table, concise summary, or structured report
