module.exports = {
  plugins: ['unused-imports', 'prettier', 'header', 'require-extensions'],
  extends: [
    'next/core-web-vitals',
    'react-app',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  settings: {
    react: {
      version: '18',
    },
    'import/resolver': {
      typescript: true,
    },
  },
  env: {
    es2020: true,
  },
  ignorePatterns: [
    'next-env.d.ts',
    'pnpm-lock.yaml'
  ],
  rules: {
    'no-case-declarations': 'off',
    'no-implicit-coercion': [2, { number: true, string: true, boolean: false }],
    '@typescript-eslint/no-redeclare': 'off',
    'import/no-useless-path-segments': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Buffer: 'Buffer usage increases bundle size and is not consistently implemented on web.',
        },
        extendDefaults: true,
      },
    ],
    'no-restricted-globals': [
      'error',
      {
        name: 'Buffer',
        message: 'Buffer usage increases bundle size and is not consistently implemented on web.',
      },
    ],
    'header/header': [
      2,
      'line',
      [' Copyright (c) RoochNetwork', ' SPDX-License-Identifier: Apache-2.0'],
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'directive', next: '*' },
    ],
  },
}
