#ifndef BROWSER_H
#define BROWSER_H

// Browser functions available within raylib via wasm-library.js

// Calling this will trigger the browser to speak the text provided in a default voice, if supported.
extern void Say(char *text);

// This registers these pointers to be updated whenever the beta and gamma orientation values change in the browser, if supported.
extern void RegisterOrientationPointers(float *beta, float *gamma);

// Trigger the vibration api, if supported. durations is an array ints and the browser will alternate between time spent vibrating and time spent not vibrating while working through the list.
extern void Vibrate(int *durations, int durationCount);

#endif