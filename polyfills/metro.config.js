module.exports = {
  resolver: {
    resolverMainFields: ['react-native', 'browser', 'module', 'main'],
    extraNodeModules: {
      crypto: require.resolve('./node_modules/@kravc/expo-credentials/polyfills/crypto'),
      stream: require.resolve('stream-browserify')
    }
  }
}
