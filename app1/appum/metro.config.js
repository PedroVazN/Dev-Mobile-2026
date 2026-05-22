const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Corrige "Unable to resolve ./theming/useTheme.js" do @react-navigation/core no Metro
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
