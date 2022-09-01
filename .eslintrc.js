module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'client/tsconfig.json',
    ecmaVersion: 6,
    sourceType: 'module',
  },
  ignorePatterns: ['webpack.config.js', '**/*.config.js', '.eslintrc.js'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'no-console': 'warn',
  },
};
