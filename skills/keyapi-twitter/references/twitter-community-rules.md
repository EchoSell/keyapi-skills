# Twitter/X Community And Network Module Rules

## 1. Module Scope

Use this module for communities, community posts/members, lists, Spaces, and adjacent network surfaces.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always resolve the selected endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Community discovery and profile

- Documentation: `https://docs.keyapi.ai/twitter/communities-search.md`
- Documentation: `https://docs.keyapi.ai/twitter/community-info.md`
- Documentation: `https://docs.keyapi.ai/twitter/community-members.md`
- Purpose: Find communities, inspect community metadata, and retrieve members.

### Best Suited For

- community discovery
- community validation
- member sampling
- network research

### Routing Rules

- Use communities search when the community target is unknown.
- Use community info after selecting or receiving a community ID.
- Use community members only when member context is required.

## 3. Community posts and search modes

- Documentation: `https://docs.keyapi.ai/twitter/comunity-posts.md`
- Documentation: `https://docs.keyapi.ai/twitter/communities-posts-search-top.md`
- Documentation: `https://docs.keyapi.ai/twitter/communities-posts-search-latest.md`
- Purpose: Retrieve community posts or search within community posts by ordering mode.

### Best Suited For

- community content monitoring
- top post discovery
- fresh post checks
- topic research inside a community

### Routing Rules

- Use community posts for general community content.
- Use top search when influence/visibility matters.
- Use latest search when freshness matters.
- Enrich selected tweets with content rules when thread/replies are needed.

## 4. Lists and list timelines

- Documentation: `https://docs.keyapi.ai/twitter/list-timeline.md`
- Documentation: `https://docs.keyapi.ai/twitter/list-members.md`
- Documentation: `https://docs.keyapi.ai/twitter/list-followers.md`
- Purpose: Inspect list timelines, list members, or list followers.

### Best Suited For

- curated account monitoring
- list membership analysis
- topic/account set tracking

### Routing Rules

- Use list timeline for content from a list.
- Use list members/followers for network structure.
- Do not mix list followers with account followers in output.

## 5. Spaces

- Documentation: `https://docs.keyapi.ai/twitter/spaces-info.md`
- Purpose: Retrieve information for a Twitter/X Space.

### Best Suited For

- Space detail lookup
- audio event context
- host/speaker context when returned

### Routing Rules

- Use only when a Space identifier or Space task is provided.
- Combine with profile rules only when account enrichment is needed.

## 6. Common Workflows

- Community report: community search/info -> members/posts as requested.
- Community topic monitor: top/latest community post search -> selected tweet detail.
- List report: list timeline -> list members/followers if requested.
- Space lookup: spaces info -> profile enrichment for selected accounts if needed.
