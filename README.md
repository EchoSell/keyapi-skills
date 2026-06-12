# KeyAPI Skills

KeyAPI Skills is a collection of standalone platform skills for Codex and Claude Code.

Each skill turns natural-language platform requests into documentation-guided KeyAPI REST workflows. The skills do not depend on MCP servers, package installs, or repository-root runners. Each installed `keyapi-{platform}` directory includes its own instructions, references, and helper scripts.

Runtime requirement for helper scripts: `Node.js >= 18`

## Available Skills

| Skill | Path | Covers |
|---|---|---|
| `keyapi-amazon` | `skills/keyapi-amazon/` | Amazon products, categories, sellers, offers, reviews, deals, storefronts, ASIN/GTIN conversion |
| `keyapi-facebook` | `skills/keyapi-facebook/` | Facebook public profiles, pages, groups, posts, photos, Reels, events, identifier resolution |
| `keyapi-google` | `skills/keyapi-google/` | Google web, images, videos, places, maps, reviews, news, shopping, Lens, scholar, patents, autocomplete, extraction |
| `keyapi-instagram` | `skills/keyapi-instagram/` | Instagram users, posts, Reels, Stories, Highlights, followers, following, comments, hashtags, music, locations |
| `keyapi-linkedin` | `skills/keyapi-linkedin/` | LinkedIn profiles, contact info, companies, employees, posts, comments, videos, jobs, job counts, job details |
| `keyapi-pinterest` | `skills/keyapi-pinterest/` | Pinterest users, pins, boards, followers, following, profile and board discovery |
| `keyapi-reddit` | `skills/keyapi-reddit/` | Reddit posts, comments, users, subreddits, feeds, rules, settings, search, trends |
| `keyapi-threads` | `skills/keyapi-threads/` | Threads users, posts, reposts, replies, post details, comments, keyword search |
| `keyapi-tiktok` | `skills/keyapi-tiktok/` | TikTok creators, Shop products, shops, categories, videos, hashtags, music, comments, live, trends, ads |
| `keyapi-twitter` | `skills/keyapi-twitter/` | Twitter/X tweets, profiles, timelines, media, replies, search, trends, communities, lists, jobs, Spaces, graph data |
| `keyapi-youtube` | `skills/keyapi-youtube/` | YouTube videos, comments, streams, Shorts, related videos, trending, channels, search, suggestions |

## Skill Package

Every platform skill is self-contained:

```text
skills/keyapi-tiktok/
  SKILL.md
  references/
    global-rules.md
    routing-policy.md
    scenarios.md
    setup-and-auth.md
    tiktok-rules.md
  scripts/
    configure-keyapi-auth.mjs
    search-keyapi-docs.mjs
    keyapi-api.mjs
```

What each part does:

- `SKILL.md`: entrypoint, trigger behavior, workflow, script contract, and platform-specific execution rules.
- `references/global-rules.md`: docs-first REST contract, auth, response handling, pagination, and reporting rules.
- `references/scenarios.md`: maps user intent to platform entities, scopes, metrics, and docs search terms.
- `references/routing-policy.md`: endpoint selection and multi-step workflow policy.
- `references/setup-and-auth.md`: first-time token setup, KeyAPI auth docs, and REST fallback examples.
- `references/<platform>-rules.md`: platform-specific identifiers, pagination, freshness, and output guidance.
- `scripts/configure-keyapi-auth.mjs`: local KeyAPI token setup.
- `scripts/search-keyapi-docs.mjs`: searches `https://docs.keyapi.ai/llms.txt` for this skill's platform.
- `scripts/keyapi-api.mjs`: executes REST requests for this skill's platform only.

## Install

Users can install this repository from GitHub with prompts such as:

- `Install these KeyAPI skills: https://github.com/EchoSell/keyapi-skills`
- `Install keyapi-tiktok from https://github.com/EchoSell/keyapi-skills`

Manual setup:

```bash
git clone https://github.com/EchoSell/keyapi-skills.git
cd keyapi-skills
```

Install one skill:

```bash
mkdir -p ~/.codex/skills
cp -r skills/keyapi-tiktok ~/.codex/skills/
```

Install several skills:

```bash
mkdir -p ~/.codex/skills
cp -r skills/keyapi-google ~/.codex/skills/
cp -r skills/keyapi-youtube ~/.codex/skills/
```

Install all skills:

```bash
mkdir -p ~/.codex/skills
cp -r skills/keyapi-* ~/.codex/skills/
```

Claude Code example:

```bash
mkdir -p ~/.claude/skills
cp -r skills/keyapi-tiktok ~/.claude/skills/
```

Each installed skill includes its own `scripts/` directory. The root-level `.mjs` files are development copies for repository-root testing, not runtime dependencies for installed skills.

## Authentication

Before live KeyAPI requests, configure a KeyAPI token in local environment variables.

Auth doc:

- `https://docs.keyapi.ai/overview/authentication#bearer-authentication`

From an installed skill directory, check current status:

```bash
node scripts/configure-keyapi-auth.mjs --status
```

Run guided setup:

```bash
node scripts/configure-keyapi-auth.mjs
```

The setup script:

- prompts for the KeyAPI token locally
- writes a managed KeyAPI export block into the user's shell profile
- stores `KEYAPI_TOKEN` and `KEYAPI_API_BASE_URL` for future sessions
- supports PowerShell profiles on Windows and POSIX shell profiles on macOS/Linux

After setup, restart Codex or Claude Code, or open a new terminal session.

## Use A Skill

Ask the assistant for the platform skill by name or by platform task:

```text
Use keyapi-tiktok to find fast-growing TikTok Shop creators in the US.
```

```text
Use keyapi-google to search recent news about Apple and summarize the sources.
```

Correct runtime behavior:

1. Read the relevant `SKILL.md`.
2. Load only needed files from `references/`.
3. Search the latest docs index: `https://docs.keyapi.ai/llms.txt`.
4. Open the selected endpoint docs and extract method, `/v1/...` path, params, pagination, examples, and response shape.
5. Execute REST with the skill-local script when available, or with the host HTTP client.
6. Return user-facing analysis rather than raw endpoint jargon.

## Use The Scripts

Run script commands from the installed skill directory.

Example from `skills/keyapi-tiktok/`:

```bash
node scripts/search-keyapi-docs.mjs --query "creator detail"
```

Execute a documented GET endpoint:

```bash
node scripts/keyapi-api.mjs \
  --path /v1/tiktok/... \
  --query '{"example":"value"}'
```

Or use a platform-relative endpoint:

```bash
node scripts/keyapi-api.mjs \
  --endpoint /... \
  --query '{"example":"value"}'
```

Execute a documented POST endpoint:

```bash
node scripts/keyapi-api.mjs \
  --endpoint /... \
  --method POST \
  --body '{"example":"value"}'
```

The scripts are convenience clients. They do not define the API contract; the current KeyAPI docs do.

## Script Reference

### `scripts/configure-keyapi-auth.mjs`

Guided local setup for KeyAPI environment variables.

Supported flags:

- `--status`
- `--profile`
- `--token`
- `--base-url`

### `scripts/search-keyapi-docs.mjs`

Looks up matching lines for the current platform from:

- `https://docs.keyapi.ai/llms.txt`

Supported flags:

- `--query`
- `--limit`

### `scripts/keyapi-api.mjs`

Executes KeyAPI REST requests for the current platform.

Supported flags:

- `--path`
- `--endpoint`
- `--method`
- `--query`
- `--body`
- `--base-url`
- `--timeout-ms`

## Security

- never commit real credentials
- prefer local environment variables for secrets
- avoid pasting credentials into shared chat unless the user explicitly accepts that risk
- do not print `KEYAPI_TOKEN` in command output or final answers
