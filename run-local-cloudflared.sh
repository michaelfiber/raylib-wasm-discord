#!/usr/bin/env bash
set -Eeuo pipefail

# This runs the node application located at /server/server.js using cloudflared.
# It depends on docker being present on the system.

# server.js is a small app that serves the game files, bundle.js 
# and embeds your DISCORD_CLIENT_PUBLIC_ID into the page for the SDK files to use. 

pushd server
node server.js &

docker run --network="host" cloudflare/cloudflared:latest tunnel --url http://127.0.0.1:3001