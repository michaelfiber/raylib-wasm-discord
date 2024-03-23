#ifndef DISCORD_H
#define DISCORD_H

#include "raylib.h"

extern char discord_channel_name[255];
extern char discord_server_name[255];

typedef struct {
    bool active;
    char username[256];
    char discriminiator[256];
    char id[256];
    bool bot;
    int flags;
    char avatar[1024];
    char nickname[256];
} discord_participant;

extern discord_participant discord_participants[255];

int discord_add_participant(char *username, char *discriminator, char *id, int bot, int flags, char *avatar, char *nickname);
void discord_remove_participant(int index);

void discord_set_channel(char *name);
void discord_set_server(char *name);

#endif