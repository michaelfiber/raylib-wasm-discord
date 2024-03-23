import { DiscordSDK } from '@discord/embedded-app-sdk';

const discordSdk = new DiscordSDK(DISCORD_CLIENT_PUBLIC_ID);
var api_auth_token = '';

window.addEventListener('DOMContentLoaded', async () => {
  await setupDiscordSdk();

  Module.onRuntimeInitialized = async function () {
    let channelName = await getChannelName();
    let channelNamePtr = stringToNewUTF8(channelName)
    _discord_set_channel(channelNamePtr);
    _free(channelNamePtr);

    let serverName = await getServerName();
    let serverNamePtr = stringToNewUTF8(serverName);
    _discord_set_server(serverNamePtr);
    _free(serverNamePtr);
  }

  let wasm = document.createElement('script');
  wasm.src = "game.js";

  wasm.onload = async function () {
    
  }

  document.head.appendChild(wasm);
});

async function getChannelName() {
  let channelName = 'unknown';

  if (discordSdk.channelId != null && discordSdk.guildId != null) {
    const channel = await discordSdk.commands.getChannel({ channel_id: discordSdk.channelId });
    if (channel.name != null) {
      channelName = channel.name;
    }
  }

  return channelName;
}

async function getServerName() {
  let serverName = 'unknown';

  const guilds = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${api_auth_token}`,
      'Content-Type': 'application/json',
    },
  });

  const response = await guilds.json();

  const currentGuild = response.find((g) => g.id === discordSdk.guildId);

  if (currentGuild != null) {
    serverName = currentGuild.name;
  }

  return serverName;
}

async function setupDiscordSdk() {

  await discordSdk.ready();

  const { code } = await discordSdk.commands.authorize({
    client_id: DISCORD_CLIENT_PUBLIC_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: [
      "identify",
      "guilds",
    ],
  });

  const response = await fetch("/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });

  const { access_token } = await response.json();

  const auth = await discordSdk.commands.authenticate({
    access_token,
  });

  if (auth == null) {
    throw new Error("Authenticate command failed");
  }

  api_auth_token = auth.access_token
}