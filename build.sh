#!/bin/bash

# To disable optimization for faster builds, pass 'optimize=none' to script.

r.js -o build.js $*
cp index.html build/
mkdir -p build/css
lessc css/main.less > build/css/main.css
