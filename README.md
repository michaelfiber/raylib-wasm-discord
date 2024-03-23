# A starter project that builds raylib for WASM for Discord Embedded App SDK

## Before you start
Go to the Discord developers portal, create an app, add an activity.  Go to the `oauth2` section and get the Client ID and Client Secret.  These have to be placed in a .env file at the root of the project. Look at `/example.env` to see what the variables should be named.

## Raylib part
The raylib part is in `/src`.  Be sure to install the EMSDK dependencies by running `./install-linux.sh` and then you can `cd src && make game.js`.  This will build the game files into WASM files and place them in `/server/static`

## Server part
The server part is in `/server`. This is a tiny NodeJS application that serves up an index file with the public Discord Client ID embedded. There is also a pre-bundled SPA that includes the Discord embedded-app-sdk. It also has some glue code that connects various Discord related functions to the functions found in the raylib program at `/src/discord.c`.  For instance, this glue code runs `discord_set_channel` and `discord_set_server` when the app initializes to populate the raylib program with some basic info about the Discord environment.

## Much needed improvements
The Discord glue code (JS side located at `/server/static/main.js` and C raylib side located at `/src/discord.c`) need a lot more functionality to make this all useful. 