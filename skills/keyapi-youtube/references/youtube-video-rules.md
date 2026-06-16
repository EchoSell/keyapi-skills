# YouTube Video Module Rules

## 1. Module Scope

Use this module for YouTube video information, comments, sub-comments, related videos, streams info, and Shorts search.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Get Video Information

- Documentation: `https://docs.keyapi.ai/youtube/get-video-information.md`
- Purpose: retrieve detailed raw video information.
- Best suited for video metadata, channel, engagement, playback context, and full video analysis.

### Rules

- Use when the user provides a video URL/ID or asks for detail on one video.
- Preserve video IDs for comments, related videos, streams info, and sub-comment workflows.

## 3. Comments And Sub Comments

- Documentation: `https://docs.keyapi.ai/youtube/get-video-comments.md`
- Documentation: `https://docs.keyapi.ai/youtube/get-video-sub-comments.md`
- Purpose: retrieve video comments and replies to comments.
- Best suited for audience reaction analysis, comment evidence, and discussion expansion.

### Rules

- Use comments first; sub-comments require a selected comment/reply token from comment results.
- Respect continuation tokens exactly as documented.

## 4. Related Videos And Streams Info

- Documentation: `https://docs.keyapi.ai/youtube/get-related-videos.md`
- Documentation: `https://docs.keyapi.ai/youtube/get-video-streams-info.md`
- Purpose: retrieve recommended related content or video stream/playback formats.
- Best suited for recommendation context and media format/playback inspection.

### Rules

- Use related videos for content adjacency, not as proof of ranking.
- Use streams info only when format or playback URL data is explicitly needed.

## 5. YouTube Shorts Search

- Documentation: `https://docs.keyapi.ai/youtube/youtube-shorts-search.md`
- Purpose: search YouTube Shorts.
- Best suited for short-form video discovery and Shorts-specific content research.

### Rules

- Use this instead of general video search when the user specifically asks for Shorts.
- Follow continuation guidance from the docs because first responses may mix content.

## 6. Common Workflows

- Video report: video information -> comments -> selected sub-comments -> related videos.
- Media inspection: video information -> streams info.
- Shorts research: Shorts search -> selected video information/comments.
