# LinkedIn Rules

## Entity Scope

people, profiles, companies, posts, comments, videos, images, experience, education, skills, certifications, publications, honors, recommendations, interests, jobs, employees

## Platform-Specific Rules

- Distinguish person-profile endpoints from company endpoints before choosing docs.
- Use canonical public profile or company identifiers when docs require them.
- For job workflows, resolve job list/count before job detail when only a company is provided.

## Scenario Module Routing

- Use `linkedin-user-rules.md` for people search, user profile/about/contact, career background, credentials, posts, comments, media, interests, and follower/connection signals.
- Use `linkedin-company-rules.md` for company profile, company people, and company posts.
- Use `linkedin-jobs-rules.md` for company job count, company jobs, and job detail.
- If a request spans multiple modules, load the smallest set of scenario modules needed and confirm report scope before broad multi-endpoint execution.

## Documentation Hints

- Filter `https://docs.keyapi.ai/llms.txt` for links under `https://docs.keyapi.ai/linkedin/`.
- Treat endpoint titles as hints, not stable tool names.
- Extract the current REST method and path from the OpenAPI block on the docs page.
- Use examples from the docs page only after replacing sample identifiers with user-provided or resolved identifiers.

## Output Guidance

- For discovery tasks, return ranked candidates with key evidence and next-step enrichment suggestions.
- For detail tasks, return a compact entity profile plus important raw identifiers.
- For trend/ranking tasks, state the metric, time window, market, and any API coverage limitations.
- For reports, organize findings by entity, performance signals, risks, and recommended follow-up calls.
