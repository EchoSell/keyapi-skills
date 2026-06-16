# Instagram Discovery Module Rules

## 1. Module Scope

Use this module for Instagram general search, hashtag search, music search, places search, city lookup, and coordinate-based location search.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. General Search

- Documentation: `https://docs.keyapi.ai/instagram/general-search.md`
- Purpose: perform broad Instagram search by keyword.
- Best suited for exploratory requests when the user has not specified users, hashtags, places, music, or Reels.

### Rules

- Use this when the desired entity type is ambiguous.
- After results clarify entity type, route to user, content, hashtag, music, or place workflows.

## 3. Hashtag And Music Search

- Documentation: `https://docs.keyapi.ai/instagram/search-hashtags.md`
- Documentation: `https://docs.keyapi.ai/instagram/search-music.md`
- Purpose: resolve hashtags or music by keyword.
- Best suited for topic, campaign, audio, and trend discovery.

### Rules

- Use search endpoints before content endpoints that require hashtag or music identifiers.
- Preserve IDs and names exactly for downstream content retrieval.

## 4. Places, Cities, And Coordinate Search

- Documentation: `https://docs.keyapi.ai/instagram/search-places.md`
- Documentation: `https://docs.keyapi.ai/instagram/get-cities-by-country.md`
- Documentation: `https://docs.keyapi.ai/instagram/search-locations-by-coordinates.md`
- Purpose: find Instagram places, city/region values, or nearby locations.
- Best suited for local discovery, location-based content workflows, and geographic filtering.

### Rules

- Use city lookup when the request starts from country-level geography.
- Use coordinate search when the user provides latitude/longitude or asks for nearby locations.

## 5. Common Workflows

- Ambiguous search: general search -> route selected entity to the matching module.
- Topic discovery: hashtag search -> posts by hashtag.
- Location discovery: places/cities/coordinates -> content or user workflows when supported by docs.
