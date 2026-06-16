# Google Search And Extraction Module Rules

## 1. Module Scope

Use this module for Google web search, images, videos, maps, places, reviews, news, shopping, Lens, scholar, patents, autocomplete, and webpage extraction.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Web Search And Autocomplete

- Documentation: `https://docs.keyapi.ai/google/search.md`
- Documentation: `https://docs.keyapi.ai/google/autocomplete.md`
- Purpose: retrieve Google search results or search suggestions.
- Best suited for general research, source discovery, search intent expansion, and query refinement.

### Rules

- Use autocomplete before search when the user asks for keyword ideas or search intent expansion.
- Use web search for source discovery, then webpage extraction for selected pages when needed.

## 3. Images, Lens, And Videos

- Documentation: `https://docs.keyapi.ai/google/images.md`
- Documentation: `https://docs.keyapi.ai/google/image-search(lens).md`
- Documentation: `https://docs.keyapi.ai/google/videos.md`
- Purpose: retrieve visual or video search results, including image/Lens workflows.
- Best suited for visual discovery, reverse-image-style lookup, media research, and video result collection.

### Rules

- Use Lens when the user starts from an image URL or visual lookup.
- Use images or videos when the user starts from a text query.

## 4. Places, Maps, And Reviews

- Documentation: `https://docs.keyapi.ai/google/places.md`
- Documentation: `https://docs.keyapi.ai/google/maps.md`
- Documentation: `https://docs.keyapi.ai/google/reviews.md`
- Purpose: retrieve local place, map, and review data.
- Best suited for local business discovery, place comparison, reputation analysis, and location-based research.

### Rules

- Use places/maps for discovery and place detail context.
- Use reviews only after the relevant place or review token/input is known from docs or prior results.

## 5. News, Shopping, Scholar, And Patents

- Documentation: `https://docs.keyapi.ai/google/news.md`
- Documentation: `https://docs.keyapi.ai/google/shopping.md`
- Documentation: `https://docs.keyapi.ai/google/scholar.md`
- Documentation: `https://docs.keyapi.ai/google/patents.md`
- Purpose: retrieve specialized Google vertical results.
- Best suited for current news research, product shopping comparison, academic literature discovery, and patent lookup.

### Rules

- Choose the vertical endpoint that matches the requested result surface instead of using generic web search.
- State the surface used in the final answer.

## 6. Webpage Extraction

- Documentation: `https://docs.keyapi.ai/google/webpage.md`
- Purpose: extract a webpage from a URL.
- Best suited for summarizing or analyzing a selected search result or user-provided URL.

### Rules

- Use after search when the user needs page content rather than only search snippets.
- Do not treat search snippets as full source content when webpage extraction is needed.

## 7. Common Workflows

- Research: `autocomplete` when useful -> `search` or a vertical endpoint -> `webpage`.
- Local analysis: `places` or `maps` -> `reviews`.
- Visual lookup: `Image Search(Lens)` for image URL input; `images` for text-query image search.
