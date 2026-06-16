# Twitter Community List And Spaces Module Rules

## 1. Module Scope

Use this module for Twitter/X communities, community posts, community members, lists, list timelines, list members, list followers, and Spaces info.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Communities

- Documentation: `https://docs.keyapi.ai/twitter/communities-search.md`
- Documentation: `https://docs.keyapi.ai/twitter/community-info.md`
- Documentation: `https://docs.keyapi.ai/twitter/community-members.md`
- Documentation: `https://docs.keyapi.ai/twitter/comunity-posts.md`
- Documentation: `https://docs.keyapi.ai/twitter/communities-posts-search-top.md`
- Documentation: `https://docs.keyapi.ai/twitter/communities-posts-search-latest.md`
- Purpose: search communities, inspect community info, members, and posts.
- Best suited for community discovery, community content monitoring, and community membership analysis.

### Rules

- Use community search before info/members/posts when the community ID is unknown.
- Use top/latest community post search according to the user's freshness or relevance need.

## 3. Lists

- Documentation: `https://docs.keyapi.ai/twitter/list-timeline.md`
- Documentation: `https://docs.keyapi.ai/twitter/list-members.md`
- Documentation: `https://docs.keyapi.ai/twitter/list-followers.md`
- Purpose: retrieve list timeline, list members, or list followers.
- Best suited for curated account monitoring and list-based audience or content analysis.

### Rules

- Use list timeline for content, members for accounts in the list, and followers for audience around the list.
- Preserve list IDs and pagination tokens from the API response.

## 4. Spaces

- Documentation: `https://docs.keyapi.ai/twitter/spaces-info.md`
- Purpose: retrieve Twitter/X Spaces information.
- Best suited for audio-room lookup and Spaces metadata checks.

### Rules

- Use only when the user provides or asks about a Space.
- Keep Spaces metadata separate from tweet/community content.

## 5. Common Workflows

- Community report: community search -> community info -> posts/members.
- Community content monitor: community posts or community search top/latest -> tweet detail.
- List monitor: list timeline -> selected tweet detail; list members/followers as needed.
