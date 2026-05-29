const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Evita erro de resolução em @react-navigation/core (useTheme)
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
