module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'only-warn',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'linebreak-style': 0,
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  root: true,
};
