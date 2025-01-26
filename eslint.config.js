// eslint.config.js
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';

// Import the whole plugin as default (CommonJS)
import tsPlugin from '@typescript-eslint/eslint-plugin';
// Destructure the "configs" property
const { configs: tsConfigs } = tsPlugin;

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // 1) Common JS + TS settings
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      },
    },
  },

  // 2) TypeScript recommended
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Attach the TypeScript plugin
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    // Spread recommended rules from the plugin’s configs
    rules: {
      ...tsConfigs.recommended.rules,
    },
  },

  // 3) React recommended (flat config)
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
    },
  },
];
