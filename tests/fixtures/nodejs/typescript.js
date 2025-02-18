import js from '@eslint/js'
import globals from 'globals'
import ts from 'typescript-eslint'

import { GLOB_PATTERNS } from '../../../libs/constants'
import { CJSFixture } from './cjs'
import { ESMFixture } from './esm'

export const typescriptFixture = [
  {
    name: 'pest-control/nodejs',
    files: [GLOB_PATTERNS.ALL_BASE_EXTENSION_FILES],
    ignores: [...GLOB_PATTERNS.BASIC_IGNORE_PATHS],
    plugins: {
      '@typescript-eslint': ts.plugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: ts.parser,
      parserOptions: {
        project: ['tsconfig?(.*).json'],
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommendedTypeChecked.rules,
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
          checksConditionals: false,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/only-throw-error': 'off',
    },
  },
  ...CJSFixture,
  ...ESMFixture,
]
