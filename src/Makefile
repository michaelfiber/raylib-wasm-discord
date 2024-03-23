.ONESHELL:

# Add any project C files here to have them built as part of the project.
PROJECT_SOURCE_FILES ?= main.c discord.c

# This is hardcoded to the path that `install-linux.sh` and `install-windows.bat` 
# place emsdk files to avoid needing to set up the environment to build.
CC=../emsdk/emsdk-main/upstream/emscripten/emcc 

# This is the directory within `src` where the finished files will be placed.
DEST=../server/static/

CFLAGS=-I./external -s USE_GLFW=3 --preload-file resources
MAKE=make

OBJ=$(patsubst %.c, %.o, $(PROJECT_SOURCE_FILES)) ./external/libraylib.a

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

game.js: $(OBJ)
	mkdir -p $(DEST)
	$(CC) -o $(DEST)/$@ $^ $(CFLAGS) -sEXPORTED_FUNCTIONS=_discord_set_channel,_discord_set_server,_main -sEXPORTED_RUNTIME_METHODS=ccall,cwrap --js-library wasm-library.js

clean:
	rm *.o