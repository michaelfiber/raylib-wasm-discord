#include "raylib.h"
#include "emscripten/emscripten.h"
#include "discord.h"

void update();

Texture2D raylib_logo;

int main(void)
{
    InitWindow(800, 600, "Hello World!");

    raylib_logo = LoadTexture("resources/raylib_logo.png");

    emscripten_set_main_loop(update, 60, 1);

    UnloadTexture(raylib_logo);

    CloseWindow();
}

void update()
{
    BeginDrawing();
    ClearBackground(BLUE);
    DrawText(TextFormat("Channel: %s\n\nServer: %s", discord_channel_name, discord_server_name), 100, 100, GetFontDefault().baseSize * 2, WHITE);
    DrawTexture(raylib_logo, 600, 0, WHITE);

    int y = 150;
    for (int i = 0; i < 255; i++)
    {
        if (discord_participants[i].active) {
            DrawText(TextFormat("Participant: %s", discord_participants[i].username), 100, y, GetFontDefault().baseSize * 2, GREEN);
            y += 20;
        }
    }

    DrawCircleV(GetMousePosition(), 5.0f, RED);

    EndDrawing();
}
