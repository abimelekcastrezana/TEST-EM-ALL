module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true
  },
  extends: [
    'eslint:recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vitest.config.js'],
  overrides: [
    {
      files: ['*.mjs'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      rules: {
        'no-undef': 'off',
        'import/no-unresolved': 'off'
      }
    },
    {
      files: ['*.js'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script'
      },
      rules: {
        'no-undef': 'off',
        'import/no-unresolved': 'off'
      }
    }
  ]
};