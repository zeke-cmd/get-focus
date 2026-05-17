// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add COOP/COEP headers required for SharedArrayBuffer (expo-sqlite web)
config.server = {
  ...config.server,
  rewriteRequestUrl: config.server?.rewriteRequestUrl,
  enhanceMiddleware: (metroMiddleware, metroServer) => {
    return (req, res, next) => {
      // Add headers to EVERY response
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      return metroMiddleware(req, res, next);
    };
  },
};

module.exports = config;
