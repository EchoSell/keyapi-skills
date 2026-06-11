# Setup And Auth

Use this guide whenever the user has not configured KeyAPI credentials yet.

## Goal

Convert first-time users into successfully authenticated users with the least friction, while directing them to the KeyAPI registration, token, and local environment-variable flow.

## What The Docs Say

KeyAPI REST requests use Bearer token authentication. Live requests must send the token in the HTTP `Authorization` header.

API base URL:

- `https://api.keyapi.ai`

Docs index:

- `https://docs.keyapi.ai/llms.txt`

Dashboard:

- `https://keyapi.ai/app/dashboard`

Auth header:

- `Authorization: Bearer $KEYAPI_TOKEN`

## First-Time User Flow

1. Tell the user they need a KeyAPI account and token before live calls can work.
2. Send them to the KeyAPI dashboard to register, manage access, or retrieve their token.
3. Require them to run the local setup script before the first live request.
4. Explain that the setup script stores credentials in shell environment variables.
5. Resume the original task only after setup is complete and a new shell/session can read the variables.

## Recommended Setup Command

Preferred command:

```bash
node ./configure-keyapi-auth.mjs
```

Check current status:

```bash
node ./configure-keyapi-auth.mjs --status
```

Non-interactive setup when the user is already in a private local shell:

```bash
node ./configure-keyapi-auth.mjs --token "your_keyapi_token"
```

Optional custom API base URL:

```bash
node ./configure-keyapi-auth.mjs --token "your_keyapi_token" --base-url "https://api.keyapi.ai"
```

What this command does:

- prompts the user for the KeyAPI token locally
- writes the managed KeyAPI export block into the user's shell profile
- keeps `KEYAPI_TOKEN` and `KEYAPI_API_BASE_URL` in environment variables instead of asking the user to keep passing secrets on the command line
- supports PowerShell profiles on Windows and POSIX shell profiles on macOS/Linux
- prepares future Codex or Claude Code sessions to use the API

After setup, the user should restart Codex or Claude Code, or open a new terminal session.

## Script Contract

This skill assumes these repository scripts exist:

- `./configure-keyapi-auth.mjs`
- `./search-keyapi-docs.mjs`
- `./keyapi-api.mjs`

Use them in this order when possible:

1. check auth status with `node ./configure-keyapi-auth.mjs --status`
2. search current docs with `node ./search-keyapi-docs.mjs --platform amazon --query "<entity action>"`
3. execute live requests with `node ./keyapi-api.mjs`

## Direct REST Request Template

Use the docs page to determine the exact method, path, query parameters, request body, and pagination contract before calling the API.

GET example for Amazon:

```bash
node ./keyapi-api.mjs \
  --path /v1/amazon/... \
  --query '{"example":"value"}'
```

POST example for Amazon:

```bash
node ./keyapi-api.mjs \
  --path /v1/amazon/... \
  --method POST \
  --body '{"example":"value"}'
```

PowerShell direct GET fallback:

```powershell
$headers = @{ Authorization = "Bearer $env:KEYAPI_TOKEN" }
$uri = "https://api.keyapi.ai/v1/amazon/..."
Invoke-RestMethod -Method Get -Uri $uri -Headers $headers
```

PowerShell direct POST fallback:

```powershell
$headers = @{
  Authorization = "Bearer $env:KEYAPI_TOKEN"
  "Content-Type" = "application/json"
}
$body = @{ example = "value" } | ConvertTo-Json -Depth 20
Invoke-RestMethod -Method Post -Uri "https://api.keyapi.ai/v1/amazon/..." -Headers $headers -Body $body
```

## Recommended Wording

Use short, direct wording such as:

- "To execute live KeyAPI requests, I first need your KeyAPI token configured locally."
- "Run `node ./configure-keyapi-auth.mjs` in this repository, then restart Codex or Claude Code."
- "The setup script stores the token in shell environment variables, so you do not need to paste it into chat."

## Security Rules

- Prefer local environment variables over pasting secrets into a shared transcript.
- If the user insists on pasting a token, warn them that local environment-variable setup is safer.
- Never log, print, or restate `KEYAPI_TOKEN` back to the user.
- Never commit real credentials.
- Do not include tokens in examples, screenshots, reports, or saved artifacts.

## Supported Environment Variables

- `KEYAPI_TOKEN`
- `KEYAPI_API_BASE_URL` optional, defaults to `https://api.keyapi.ai`

## Response Pattern

If credentials are missing, pause live execution and say:

1. what is missing
2. where to get it
3. the setup command to run
4. that a restart or new terminal session may be needed
5. that the original request can continue after setup
