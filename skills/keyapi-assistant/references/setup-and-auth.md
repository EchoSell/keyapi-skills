# Setup And Authentication

Configure one KeyAPI API Key before the first request:

1. Open `https://keyapi.ai/app/dashboard` and copy an API Key.
2. Enter the installed `keyapi-assistant` directory.
3. Run the configuration script:

```bash
cd ~/keyapi-assistant
node scripts/setup-keyapi.mjs
```

4. Paste the copied API Key when prompted.

Configure it once; the same API Key is shared by all platforms supported by `keyapi-assistant`.
If an already-running agent cannot see the new API Key, restart the agent or terminal.

Check whether requests are ready:

```bash
node scripts/setup-keyapi.mjs --status
```

Both initial setup and `--status` display the masked API Key.

- `KeyAPI API Key configured successfully.`: continue with the API request.
- `KeyAPI API Key is not configured.`: run the setup command above.

Never ask the user to paste the API Key into chat and never echo it.
