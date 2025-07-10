#!/bin/bash
# This script sets port 8030 to public in GitHub Codespaces to handle preflight request issues.
# @see https://github.com/community/community/discussions/15351

set -euo pipefail

# Default server port assumed for codespace environment
DEFAULT_SERVER_PORT=8030

if [[ -n "${CODESPACE_NAME:-}" ]]; then
    echo "Setting port $DEFAULT_SERVER_PORT to public in Codespace: $CODESPACE_NAME"
    gh codespace ports visibility "$DEFAULT_SERVER_PORT:public" -c "$CODESPACE_NAME"
else
    echo "Not running in a Codespace, skipping port visibility change."
fi
