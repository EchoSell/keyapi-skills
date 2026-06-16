# YouTube Channel Module Rules

## 1. Module Scope

Use this module for YouTube channel search, channel ID/URL conversion, channel description, and channel videos.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Channel Search And ID Resolution

- Documentation: `https://docs.keyapi.ai/youtube/search-channel.md`
- Documentation: `https://docs.keyapi.ai/youtube/search-channels.md`
- Documentation: `https://docs.keyapi.ai/youtube/get-channel-id.md`
- Documentation: `https://docs.keyapi.ai/youtube/get-channel-id-from-url.md`
- Documentation: `https://docs.keyapi.ai/youtube/get-channel-url-from-channel-id.md`
- Purpose: find channels and convert between channel names, URLs, IDs, and handles.
- Best suited for channel lookup, identifier normalization, and preparing channel detail workflows.

### Rules

- Use URL-to-ID conversion when the user provides a channel URL.
- Use channel search when the user provides a name or keyword.
- Preserve channel IDs for description and videos endpoints.

## 3. Channel Description

- Documentation: `https://docs.keyapi.ai/youtube/get-channel-description.md`
- Purpose: retrieve channel profile details.
- Best suited for channel summary, subscriber/view context, join date, and social links.

### Rules

- Use after channel ID resolution.
- Keep profile facts separate from video-level performance.

## 4. Channel Videos

- Documentation: `https://docs.keyapi.ai/youtube/get-channel-videos.md`
- Purpose: retrieve videos from a channel.
- Best suited for channel content review, upload history, and creator video analysis.

### Rules

- Use after channel ID resolution.
- Preserve continuation tokens for pagination and video IDs for video detail/comments.

## 5. Common Workflows

- Channel report: channel search or URL-to-ID -> channel description -> channel videos.
- Creator content review: channel videos -> selected video information/comments.
