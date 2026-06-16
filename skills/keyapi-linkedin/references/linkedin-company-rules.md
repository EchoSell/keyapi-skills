# LinkedIn Company Module Rules

## 1. Module Scope

Use this module for LinkedIn company profile, company employees, company posts, and company-level analysis workflows.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Get Company Profile

- Documentation: `https://docs.keyapi.ai/linkedin/get-company-profile.md`
- Purpose: retrieve LinkedIn company profile information.
- Best suited for company lookup, profile enrichment, and organization summaries.

### Rules

- Use after the company identifier or profile URL is known from the user or docs-supported search flow.
- Preserve company identifiers for people, posts, and jobs endpoints.

## 3. Get Company People

- Documentation: `https://docs.keyapi.ai/linkedin/get-company-people.md`
- Purpose: retrieve employees or people associated with a company.
- Best suited for team mapping, hiring intelligence, and employee-list analysis.

### Rules

- Use when the user asks who works at a company or needs people associated with the company.
- Enrich selected people through LinkedIn user endpoints when needed.

## 4. Get Company Posts

- Documentation: `https://docs.keyapi.ai/linkedin/get-company-posts.md`
- Purpose: retrieve posts published by a LinkedIn company.
- Best suited for company content monitoring, announcement review, and social activity checks.

### Rules

- Use when the user asks for company posts or recent company activity.
- Keep company-authored activity separate from employee activity.

## 5. Common Workflows

- Company profile: company profile -> company people and company posts as needed.
- Hiring/company research: company profile -> people -> jobs/job count.
- Content monitoring: company profile -> company posts.
