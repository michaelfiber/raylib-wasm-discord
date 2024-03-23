#!/usr/bin/env bash
set -Eeuo pipefail

# This rebuilds the bundle.js file located at /server/static/bundle.js. 
# Run this if you have updated to a new version of the embedded-sdk or if you have modified /server/static/main.js

pushd server
./node_modules/.bin/esbuild static/main.js --bundle --outfile=static/bundle.js
