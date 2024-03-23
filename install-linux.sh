#!/usr/bin/env bash

set -Eeuo pipefail

# Install and activate emsdk
mkdir -p emsdk
wget https://github.com/emscripten-core/emsdk/archive/refs/heads/main.zip
unzip -d emsdk main.zip
rm main.zip

pushd emsdk/emsdk-main
./emsdk install latest
./emsdk activate latest
popd

# Download unzip WASM nightly build of libraylib.a and raylib.h into src/external
mkdir -p src/external

pushd src/external
wget -qO- https://michaelfiber.github.io/raylib-nightly-wasm/raylib.wasm.tar.gz | tar xvz
popd

pushd server
npm install
popd

