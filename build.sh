#!/bin/bash

# To disable optimization for faster builds, pass 'optimize=none' to script.
# Also you can pass 'optimizeCss=none' to turn off CSS optimization.

r.js -o build.js $*
