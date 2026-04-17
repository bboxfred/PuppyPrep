// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix: Override the web transformer to use the 'default' profile instead of 'hermes-stable'.
// The Hermes profile emits `import.meta` which requires `type="module"` on the script tag,
// but Expo's HTML template uses a plain `<script defer>` tag — causing a SyntaxError on web.
const originalResolver = config.transformer?.getTransformOptions;
config.transformer = {
  ...config.transformer,
  getTransformOptions: async (...args) => {
    const options = originalResolver ? await originalResolver(...args) : {};
    return {
      ...options,
      transform: {
        ...options?.transform,
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    };
  },
};

module.exports = config;
