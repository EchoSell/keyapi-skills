# KeyAPI Assistant

`keyapi-assistant` is one unified skill for discovering and calling every platform currently supported by KeyAPI. It determines the platform from the user's goal, discovers current endpoints at runtime, resolves the selected OpenAPI operation, and executes the documented REST request.

The skill does not maintain separate packages or static endpoint catalogs for TikTok, Instagram, Amazon, Google, or other platforms.

Runtime requirement: `Node.js >= 18`.

## Package

```text
skills/keyapi-assistant/
  SKILL.md
  references/
    global-rules.md
    discovery-and-routing.md
    setup-and-auth.md
  scripts/
    setup-keyapi.mjs
    discover-keyapi.mjs
    call-keyapi.mjs
```

- `SKILL.md`: unified workflow and execution contract.
- `references/discovery-and-routing.md`: semantic platform and endpoint selection.
- `references/global-rules.md`: request, response, pagination, and output rules.
- `references/setup-and-auth.md`: one-time shared API key setup.
- `scripts/discover-keyapi.mjs`: platform index, paginated endpoint discovery, and full OpenAPI operation resolution.
- `scripts/call-keyapi.mjs`: authenticated requests for complete `/v1/...` paths across all platforms.

## Install

Install from the repository:

```bash
npx skills add EchoSell/keyapi-skills
```

Or install manually for Codex:

```bash
git clone https://github.com/EchoSell/keyapi-skills.git
mkdir -p ~/.codex/skills
cp -r keyapi-skills/skills/keyapi-assistant ~/.codex/skills/
```

Claude Code example:

```bash
mkdir -p ~/.claude/skills
cp -r keyapi-skills/skills/keyapi-assistant ~/.claude/skills/
```

## Configure API Key

After installing the skill:

1. Open `https://keyapi.ai/app/dashboard` and copy an API Key.
2. Enter the installed `keyapi-assistant` directory and run:

```bash
cd ~/keyapi-assistant
node scripts/setup-keyapi.mjs
```

3. Paste the copied API Key when prompted.

If an already-running agent cannot see the new API Key, restart the agent or terminal.

Check status at any time with:

```bash
node scripts/setup-keyapi.mjs --status
```

Both initial setup and the status command display the configured API Key in masked form.

The API key is configured once and shared by every platform supported through `keyapi-assistant`. No platform-specific setup is required.

## Other KeyAPI Tools

KeyAPI also offers these optional tools:

- [KeyAPI CLI](https://www.keyapi.ai/ai/cli) provides terminal-based endpoint discovery and API calls. Install it with `npm install -g keyapi-cli@latest` when needed.
- [KeyAPI MCP](https://www.keyapi.ai/ai/mcp) is available at `https://mcp.keyapi.ai/mcp` for MCP-compatible AI clients and supports OAuth authentication.

This skill uses its included scripts and does not require either tool.

## Use The Skill

Ask for a platform data task naturally:

```text
Use keyapi-assistant to find TikTok influencers in the US for a baby-products campaign.
```

```text
Use keyapi-assistant to compare recent Amazon product results for portable blenders.
```

The agent should:

1. determine or confirm the platform
2. discover current endpoints page by page
3. semantically select the closest operation
4. resolve its complete OpenAPI parameters and request body
5. collect only missing required inputs
6. execute the complete discovered path with the included request helper
7. return user-facing analysis

## Script Usage

Run commands from the installed `keyapi-assistant` directory.

List the current platform catalog:

```bash
node scripts/discover-keyapi.mjs --list-platforms
```

Discover one page of endpoints:

```bash
node scripts/discover-keyapi.mjs --platform tiktok --limit 10 --offset 0
```

Resolve the complete OpenAPI operation for a selected path:

```bash
node scripts/discover-keyapi.mjs \
  --platform tiktok \
  --endpoint-path /v1/tiktok/influencer/search
```

Execute a GET request with shell-stable query parameters:

```bash
node scripts/call-keyapi.mjs \
  --path /v1/tiktok/influencer/search \
  --query-param keyword=baby \
  --query-param region=US
```

Execute a POST request from a JSON body file:

```bash
node scripts/call-keyapi.mjs \
  --path /v1/amazon/... \
  --method POST \
  --body-file request.json
```

Execute an image request:

```bash
node scripts/call-keyapi.mjs \
  --path /v1/tiktok/... \
  --method POST \
  --query-param region=US \
  --image-file image.jpg \
  --image-field image_base64
```

Large responses may print a preview. Save the complete helper result when full fields are needed:

```bash
node scripts/call-keyapi.mjs \
  --path /v1/youtube/... \
  --query-param example=value \
  --output-file result.json
```

For a normal KeyAPI response envelope, the business payload in the saved helper result is at `data.data`.

## Runtime Sources

- Platform index: `https://www.keyapi.ai/openapi/index.json`
- Endpoint discovery: `https://www.keyapi.ai/openapi/discover_endpoints?platform=tiktok&limit=10&offset=0`
- Business API base URL: `https://api.keyapi.ai`
