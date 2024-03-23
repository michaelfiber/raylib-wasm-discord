#ifndef DISCORD_H
#define DISCORD_H

extern char discord_channel_name[255];
extern char discord_server_name[255];

void discord_set_channel(char *name);
void discord_set_server(char *name);

#endif