# LinkedIn User Module Rules

## 1. Module Scope

Use this module for LinkedIn people search, user profile, about, contact, experience, education, skills, certifications, publications, honors, recommendations, interests, posts, comments, videos, images, and follower/connection workflows.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Search People And Profile

- Documentation: `https://docs.keyapi.ai/linkedin/search-people.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-profile.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-about.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-contact-information.md`
- Purpose: find LinkedIn users and retrieve profile, about, and contact information.
- Best suited for professional profile lookup, candidate discovery, and contact enrichment.

### Rules

- Use search when the exact profile identifier is unknown.
- Use contact information only when explicitly needed.
- Keep profile/about facts separate from inferred suitability.

## 3. Career, Education, And Credentials

- Documentation: `https://docs.keyapi.ai/linkedin/get-user-experience.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-educations.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-skills.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-certifications.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-publications.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-honors.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-recommendations.md`
- Purpose: retrieve structured professional background and credentials.
- Best suited for resume-style summaries, candidate screening, and expertise validation.

### Rules

- Load only the credential endpoints required by the user's requested report.
- Do not treat missing sections as absence of credentials unless the API explicitly confirms it.

## 4. Activity, Interests, And Social Signals

- Documentation: `https://docs.keyapi.ai/linkedin/get-user-posts.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-comments.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-videos.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-images.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-follower-and-connection.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-interests-companies.md`
- Documentation: `https://docs.keyapi.ai/linkedin/get-user-interests-groups.md`
- Purpose: retrieve user activity, media, audience size, and interest signals.
- Best suited for thought-leadership review, network-size checks, and professional interest analysis.

### Rules

- Use posts/comments/videos/images based on the requested activity surface.
- Use follower/connection count for reach context, not as a standalone quality score.

## 5. Common Workflows

- Candidate profile: search -> profile/about -> experience/education/skills.
- Expert validation: profile -> publications/certifications/honors/recommendations.
- Activity review: profile -> posts/comments/media -> follower and interest signals.
