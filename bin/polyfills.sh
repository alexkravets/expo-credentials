#!/bin/sh

awk \
  '/web-streams-polyfill/{gsub(/web-streams-polyfill/, ".")};{print}' \
  node_modules/@transmute/did-key-cipher/dist/did-key-cipher.esm.js > \
  did-key-cipher.esm.js.new

mv \
  did-key-cipher.esm.js.new \
  node_modules/@transmute/did-key-cipher/dist/did-key-cipher.esm.js

cp \
  node_modules/web-streams-polyfill/dist/ponyfill.js \
  node_modules/@transmute/did-key-cipher/dist/

cp \
  node_modules/@kravc/expo-credentials/polyfills/metro.config.js \
  ./metro.config.js
