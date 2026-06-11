# Setup And Auth

## Required Environment

Set a KeyAPI token before making live requests:

```powershell
$env:KEYAPI_TOKEN = "your_keyapi_token"
```

Or on POSIX shells:

```bash
export KEYAPI_TOKEN=your_keyapi_token
```

Get or manage the token at `https://keyapi.ai/app/dashboard`.

## Direct Request Template

PowerShell GET example:

```powershell
$headers = @{ Authorization = "Bearer $env:KEYAPI_TOKEN" }
$uri = "https://api.keyapi.ai/v1/instagram/..."
Invoke-RestMethod -Method Get -Uri $uri -Headers $headers
```

PowerShell POST example:

```powershell
$headers = @{
  Authorization = "Bearer $env:KEYAPI_TOKEN"
  "Content-Type" = "application/json"
}
$body = @{ example = "value" } | ConvertTo-Json -Depth 20
Invoke-RestMethod -Method Post -Uri "https://api.keyapi.ai/v1/instagram/..." -Headers $headers -Body $body
```

## Auth Failure Handling

- If `KEYAPI_TOKEN` is missing, ask the user to configure it locally.
- Never ask the user to paste the token into chat unless there is no safer local setup path.
- Never print the token in command output or final answers.
