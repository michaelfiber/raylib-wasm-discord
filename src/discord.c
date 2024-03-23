#include "discord.h"
#include "stdio.h"

char discord_channel_name[255];
char discord_server_name[255];
discord_participant discord_participants[255];

// discord_* functions are exposed to JS via Makefile flag

void discord_set_channel(char *name)
{
    snprintf(discord_channel_name, 254, "%s", name);
}

void discord_set_server(char *name)
{
    snprintf(discord_server_name, 254, "%s", name);
}

void discord_remove_participant(int index)
{
    discord_participants[index].active = false;
}

int discord_add_participant(char *username, char *discriminator, char *id, int bot, int flags, char *avatar, char *nickname)
{
    for (int i = 0; i < 255; i++)
    {
        if (discord_participants[i].active)
        {
            continue;
        }

        discord_participants[i].active = true;

        snprintf(discord_participants[i].username, 254, "%s", username);
        snprintf(discord_participants[i].discriminiator, 254, "%s", discriminator);
        snprintf(discord_participants[i].id, 254, "%s", id);

        discord_participants[i].bot = bot;
        discord_participants[i].flags = flags;

        if (avatar != NULL)
        {
            snprintf(discord_participants[i].avatar, 1023, "%s", avatar);
        }
        else 
        {
            discord_participants[i].avatar[0] = '\0';
        }

        if (nickname != NULL)
        {
            snprintf(discord_participants[i].nickname, 254, "%s", nickname);
        }
        else 
        {
            discord_participants[i].nickname[0] = '\0';
        }

        return i;
    }

    return -1;
}