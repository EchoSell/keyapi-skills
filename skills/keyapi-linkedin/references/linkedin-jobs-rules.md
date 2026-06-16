# LinkedIn Jobs Module Rules

## 1. Module Scope

Use this module for LinkedIn company job count, job listings, and job detail workflows.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Get Company Job Count

- Documentation: `https://docs.keyapi.ai/linkedin/get-company-job-count.md`
- Purpose: retrieve the number of LinkedIn jobs for a company.
- Best suited for quick hiring activity checks and market/hiring momentum summaries.

### Rules

- Use when the user needs count-level hiring signal.
- Follow with company jobs only when the user needs the actual postings.

## 3. Get Company Jobs

- Documentation: `https://docs.keyapi.ai/linkedin/get-company-jobs.md`
- Purpose: retrieve LinkedIn job listings for a company.
- Best suited for open role analysis, recruiting intelligence, and hiring trend review.

### Rules

- Use after company resolution.
- Preserve job identifiers for job detail calls.

## 4. Get Job Detail

- Documentation: `https://docs.keyapi.ai/linkedin/get-job-detail.md`
- Purpose: retrieve detailed information for a LinkedIn job.
- Best suited for role requirements, responsibilities, location, and hiring analysis.

### Rules

- Use only after a job identifier is known.
- Keep job detail facts separate from inferred hiring strategy.

## 5. Common Workflows

- Hiring overview: company profile -> job count -> company jobs.
- Job analysis: company jobs -> selected job detail.
