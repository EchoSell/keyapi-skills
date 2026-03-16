#!/usr/bin/env bash
# Distributes scripts/run.js to every skill directory.
# Run this after editing scripts/run.js to keep all skill copies in sync.
#
# Usage:
#   ./scripts/sync-to-skills.sh
#   npm run sync

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SRC="$SCRIPT_DIR/run.js"

find "$ROOT/skills" -type d -name scripts | while read -r dest; do
  cp "$SRC" "$dest/run.js"
  echo "✓ synced → ${dest#"$ROOT/"}/run.js"
done

echo "Done."
