# Setup And Auth

Use this guide whenever the user has not configured KeyAPI credentials yet. When auth is missing, the assistant must proactively show the setup script command instead of only saying to configure `KEYAPI_TOKEN`.

## Goal

Convert first-time users into successfully authenticated users with the least friction, while directing them to the KeyAPI registration, token, and local environment-variable flow.

## What The Docs Say

KeyAPI REST requests use Bearer token authentication. Live requests must send the token in the HTTP `Authorization` header.

API base URL: `https://api.keyapi.ai`

Docs index:

- `https://docs.keyapi.ai/llms.txt`

Auth doc:

- `https://docs.keyapi.ai/overview/authentication#bearer-authentication`

Dashboard:

- `https://keyapi.ai/app/dashboard`

Auth header:

- `Authorization: Bearer $KEYAPI_TOKEN`

## First-Time User Flow

1. Tell the user they need a KeyAPI account and token before live calls can work.
2. Send them to the KeyAPI dashboard or auth doc to register, manage access, or retrieve their token.
3. Prefer the local setup script when script execution is available, and show the exact command `node scripts/configure-keyapi-auth.mjs`.
4. Explain that the setup script stores credentials in shell environment variables.
5. Resume the original task only after setup is complete and a new shell/session can read the variables.

## Recommended Setup Command

Preferred command when script execution is available:

```bash
node scripts/configure-keyapi-auth.mjs
```

Check current status:

```bash
node scripts/configure-keyapi-auth.mjs --status
```

Non-interactive setup when the user is already in a private local shell:

```bash
node scripts/configure-keyapi-auth.mjs --token "your_keyapi_token"
```


If the helper script is not available, ask the user to set these variables manually in their local shell:

PowerShell:

```powershell
$env:KEYAPI_TOKEN = "your_keyapi_token"
```

POSIX shell:

```bash
export KEYAPI_TOKEN=your_keyapi_token
```

What the setup script does:

- prompts the user for the KeyAPI token locally
- writes the managed KeyAPI export block into the user's shell profile
- keeps `KEYAPI_TOKEN` in environment variables instead of asking the user to keep passing secrets on the command line
- supports PowerShell profiles on Windows and POSIX shell profiles on macOS/Linux
- prepares future Codex or Claude Code sessions to use the API

After setup, the user should restart Codex or Claude Code, or open a new terminal session.

## Script Contract

This skill includes these helper scripts under `scripts/`:

- `scripts/configure-keyapi-auth.mjs`
- `scripts/search-keyapi-docs.mjs`
- `scripts/keyapi-api.mjs`

Run script commands from this skill directory. If the host agent uses a different current working directory, resolve `scripts/...` relative to this `SKILL.md`.

Use them in this order when script execution is available:

1. check auth status with `node scripts/configure-keyapi-auth.mjs --status`
2. search current docs with `node scripts/search-keyapi-docs.mjs --query "<entity action>"`
3. execute live requests with `node scripts/keyapi-api.mjs`

If script execution is unavailable in the host agent, continue with direct REST calls using the documented method, path, headers, query, and body.

## Direct REST Request Template

Use the docs page to determine the exact method, path, query parameters, request body, and pagination contract before calling the API.

GET example for Instagram:

```bash
node scripts/keyapi-api.mjs \
  --path /v1/instagram/... \
  --query '{"example":"value"}'
```

POST example for Instagram:

```bash
node scripts/keyapi-api.mjs \
  --path /v1/instagram/... \
  --method POST \
  --body '{"example":"value"}'
```

PowerShell direct GET fallback:

```powershell
$headers = @{ Authorization = "Bearer $env:KEYAPI_TOKEN" }
$uri = "https://api.keyapi.ai/v1/instagram/..."
Invoke-RestMethod -Method Get -Uri $uri -Headers $headers
```

PowerShell direct POST fallback:

```powershell
$headers = @{
  Authorization = "Bearer $env:KEYAPI_TOKEN"
  "Content-Type" = "application/json"
}
$body = @{ example = "value" } | ConvertTo-Json -Depth 20
Invoke-RestMethod -Method Post -Uri "https://api.keyapi.ai/v1/instagram/..." -Headers $headers -Body $body
```

## Recommended Wording

Use short, direct wording such as:

- "To execute live KeyAPI requests, I first need your KeyAPI token configured locally."
- "From this installed skill directory, run `node scripts/configure-keyapi-auth.mjs`, then restart Codex or Claude Code."
- "You can check whether the current session sees the token with `node scripts/configure-keyapi-auth.mjs --status`."
- "If script execution is not available, set `KEYAPI_TOKEN` locally and I can continue with direct REST calls."

## Security Rules

- Prefer local environment variables over pasting secrets into a shared transcript.
- If the user insists on pasting a token, warn them that local environment-variable setup is safer.
- Never log, print, or restate `KEYAPI_TOKEN` back to the user.
- Never commit real credentials.
- Do not include tokens in examples, screenshots, reports, or saved artifacts.

## Supported Environment Variables

- `KEYAPI_TOKEN`

## Response Pattern

If credentials are missing, pause live execution and say:

1. what is missing
2. where to get it
3. the exact setup command `node scripts/configure-keyapi-auth.mjs`, plus the `--status` check command
4. that a restart or new terminal session may be needed
5. that the original request can continue after setup
