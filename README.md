# KeyAPI Skills

KeyAPI Skills provides ready-to-install platform skills for Codex and Claude Code.

It helps AI assistants turn natural-language social, commerce, search, and content-intelligence requests into documentation-guided KeyAPI REST workflows across Amazon, Facebook, Google, Instagram, LinkedIn, Pinterest, Reddit, Threads, TikTok, Twitter / X, and YouTube.

Runtime requirement for helper scripts: `Node.js >= 18`

## Skill Layouts

This project keeps each platform as a standalone skill directory:

- Amazon: `skills/amazon/SKILL.md`
- Facebook: `skills/facebook/SKILL.md`
- Google: `skills/google/SKILL.md`
- Instagram: `skills/instagram/SKILL.md`
- LinkedIn: `skills/linkedin/SKILL.md`
- Pinterest: `skills/pinterest/SKILL.md`
- Reddit: `skills/reddit/SKILL.md`
- Threads: `skills/threads/SKILL.md`
- TikTok: `skills/tiktok/SKILL.md`
- Twitter / X: `skills/twitter/SKILL.md`
- YouTube: `skills/youtube/SKILL.md`

Each platform skill follows the same layout:

```text
skills/tiktok/
  SKILL.md
  references/
    global-rules.md
    routing-policy.md
    scenarios.md
    setup-and-auth.md
    tiktok-rules.md
```

The platform `SKILL.md` is the entrypoint. Reference modules are loaded only when needed for routing, auth setup, platform-specific rules, and endpoint selection.

## Install

Users can install this repository from GitHub with prompts such as:

- `Install these KeyAPI skills: https://github.com/EchoSell/keyapi-skills`
- `Install these skills: https://github.com/EchoSell/keyapi-skills`

Manual setup:

```bash
git clone https://github.com/EchoSell/keyapi-skills.git
cd keyapi-skills
```

Copy the platform directories you need into your agent skills directory. Platform skills can run standalone by reading the latest docs and using direct REST calls.

Claude Code example:

```bash
cp -r skills/tiktok ~/.claude/skills/keyapi-tiktok
cp -r skills/google ~/.claude/skills/keyapi-google
```

Codex example:

```bash
mkdir -p ~/.codex/skills
cp -r skills/tiktok ~/.codex/skills/keyapi-tiktok
cp -r skills/youtube ~/.codex/skills/keyapi-youtube
```

The root-level `.mjs` files are optional helper scripts for local development and repository-root execution. If a user installs only a platform skill directory, the skill should still work by using the same documented REST method, path, headers, query, and body with the host agent's HTTP client.

## First-Time Setup

Before any live KeyAPI request, configure a KeyAPI token into shell environment variables.

Auth doc:

- `https://docs.keyapi.ai/overview/authentication#bearer-authentication`

Check current status:

```bash
node ./configure-keyapi-auth.mjs --status
```

Run the guided setup:

```bash
node ./configure-keyapi-auth.mjs
```

What the setup script does:

- prompts for the KeyAPI token locally
- writes a managed KeyAPI export block into the user's shell profile
- stores `KEYAPI_TOKEN` and `KEYAPI_API_BASE_URL` in environment variables for future sessions
- supports PowerShell profiles on Windows and POSIX shell profiles on macOS/Linux

After setup, restart Codex or Claude Code, or open a new terminal session.

## Use The Scripts

These scripts are repository-root conveniences. They do not define the API contract; the current KeyAPI docs do.

### Search KeyAPI docs

```bash
node ./search-keyapi-docs.mjs --platform tiktok --query "creator detail"
```

### Execute a live KeyAPI REST request

```bash
node ./keyapi-api.mjs \
  --path /v1/google/search \
  --query '{"q":"apple inc","gl":"us","hl":"en","page":1}'
```

### Execute a POST request

```bash
node ./keyapi-api.mjs \
  --path /v1/some/post/endpoint \
  --method POST \
  --body '{"example":"value"}'
```

## What The Skills Cover

The skills are designed for these common business tasks:

- discover and benchmark creators, channels, profiles, pages, shops, sellers, and communities
- research products, categories, reviews, offers, deals, shops, storefronts, and commerce trends
- analyze videos, posts, comments, replies, Reels, Shorts, live streams, hashtags, music, and media
- search web results, images, places, maps, news, shopping, and other Google surfaces
- inspect companies, employees, jobs, professional profiles, posts, and contact signals
- assemble multi-step workflows and reports from the latest documented KeyAPI endpoints

The main skill behavior lives in each platform entrypoint:

- `skills/<platform>/SKILL.md`

Core reference modules included in every platform skill:

- `references/global-rules.md`
- `references/scenarios.md`
- `references/routing-policy.md`
- `references/setup-and-auth.md`
- `references/<platform>-rules.md`

## Project Scripts

### `configure-keyapi-auth.mjs`

Guided local setup for KeyAPI environment variables.

Supported flags:

- `--status`
- `--profile`
- `--token`
- `--base-url`

### `search-keyapi-docs.mjs`

Looks up matching lines from the KeyAPI docs index at:

- `https://docs.keyapi.ai/llms.txt`

Supported flags:

- `--query`
- `--platform`
- `--limit`

### `keyapi-api.mjs`

Executes KeyAPI REST requests with configured environment variables.

Supported flags:

- `--path`
- `--method`
- `--query`
- `--body`
- `--base-url`
- `--timeout-ms`

## Runtime Model

These skills do not depend on platform-local runners. For live API work, the assistant should:

1. Read the relevant platform `SKILL.md`.
2. Load only the needed reference files under `references/`.
3. Search `https://docs.keyapi.ai/llms.txt` for the latest endpoint docs.
4. Extract method, path, params, examples, and pagination from the linked OpenAPI block.
5. Execute REST directly against `https://api.keyapi.ai`.
6. Return analytical results in user-facing language.

## Authentication

KeyAPI uses Bearer token authentication.

Supported environment variables:

- `KEYAPI_TOKEN`
- `KEYAPI_API_BASE_URL` optional, defaults to `https://api.keyapi.ai`

See:

- `skills/<platform>/references/setup-and-auth.md`

## Security

- never commit real credentials
- prefer local environment variables for secrets
- avoid pasting credentials into shared chat unless the user explicitly accepts that risk
- do not print `KEYAPI_TOKEN` in command output or final answers
