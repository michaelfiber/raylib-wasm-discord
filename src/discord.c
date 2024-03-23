#include "discord.h"
#include "stdio.h"

char discord_channel_name[255];
char discord_server_name[255];

// exposed to JS via Makefile flag
void discord_set_channel(char *name) {
    snprintf(discord_channel_name, 254, "%s", name);
}

// exposed to JS via Makefile flag
void discord_set_server(char *name) {
    snprintf(discord_server_name, 254, "%s", name);
}
