#ifndef BROWSER_H
#define BROWSER_H

// Browser functions available within raylib via wasm-library.js
extern void Say(char *text);
extern void RegisterOrientationPointers(float *beta, float *gamma);
extern void Vibrate(int *durations, int durationCount);

#endif