import js from '@eslint/js'
import globals from 'globals'
import vitest from '@vitest/eslint-plugin'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['eslint.config.js', 'node_modules'] },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  {
    files: ['**/*.test.js'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/valid-title': 'error',
      'vitest/no-done-callback': 'error',
      'vitest/expect-expect': 'off',
    },
  },
]
