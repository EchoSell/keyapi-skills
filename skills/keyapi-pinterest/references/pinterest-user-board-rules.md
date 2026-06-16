# Pinterest User And Board Module Rules

## 1. Module Scope

Use this module for Pinterest user search, user information, pins, boards, followers, and following workflows.

These notes are routing guidance from `https://docs.keyapi.ai/llms.txt`. Before execution, always open the linked endpoint docs page and use the current method, path, parameters, pagination, and response schema.

## 2. Search Users

- Documentation: `https://docs.keyapi.ai/pinterest/search-users.md`
- Purpose: search Pinterest users.
- Best suited for resolving a profile when the user provides a name, keyword, or partial handle.

### Rules

- Use this first when the exact user identifier is unknown.
- Preserve returned user identifiers for profile, pins, boards, followers, and following calls.

## 3. Get User Information

- Documentation: `https://docs.keyapi.ai/pinterest/get-user-information.md`
- Purpose: retrieve Pinterest user profile information.
- Best suited for profile checks, creator summaries, and validating a selected account.

### Rules

- Use after search or when the user provides a known profile identifier.
- Keep profile facts separate from pin, board, and network data.

## 4. Get Pins And Boards

- Documentation: `https://docs.keyapi.ai/pinterest/get-pins.md`
- Documentation: `https://docs.keyapi.ai/pinterest/get-boards.md`
- Purpose: retrieve a user's pins or boards.
- Best suited for content library review, board analysis, and visual content discovery.

### Rules

- Use pins for individual visual content and boards for organized collections.
- Preserve pagination and board identifiers for deeper traversal.

## 5. Followers And Following

- Documentation: `https://docs.keyapi.ai/pinterest/get-followers-detail.md`
- Documentation: `https://docs.keyapi.ai/pinterest/get-following-detail.md`
- Purpose: retrieve follower or following detail.
- Best suited for audience network checks and relationship exploration.

### Rules

- Use only when the user asks for follower/following networks or account relationships.
- Do not infer complete audience demographics from follower/following lists.

## 6. Common Workflows

- Profile lookup: `Search Users` -> `Get User Information`.
- Content review: user information -> pins and boards.
- Network review: user information -> followers/following.
