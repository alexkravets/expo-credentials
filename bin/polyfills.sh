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

sed \
  "$(( $(wc -l <node_modules/rdf-canonize/package.json)-1 )),$ d"\
  node_modules/rdf-canonize/package.json > package.json.new

echo "  },
  \"react-native\": {
    \"./lib/MessageDigest.js\": \"./lib/MessageDigest.js\",
    \"rdf-canonize-native\": false
  }
}
" >> package.json.new

mv \
  package.json.new \
  node_modules/rdf-canonize/package.json
