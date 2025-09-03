const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettier = require('eslint-config-prettier');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      prettier: require('eslint-plugin-prettier'),
      import: require('eslint-plugin-import'),
    },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  prettier,
]);
