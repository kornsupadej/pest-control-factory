import eslintPluginImportX from 'eslint-plugin-import-x'

import { GLOB_PATTERNS } from '../../../libs/constants'

export const baseFixture = [
  {
    ...eslintPluginImportX.flatConfigs.recommended,
    name: 'pest-control/formatting',
    files: [GLOB_PATTERNS.ALL_BASE_EXTENSION_FILES],
    ignores: [...GLOB_PATTERNS.BASIC_IGNORE_PATHS],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      ...eslintPluginImportX.flatConfigs.recommended.rules,
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],
      'import-x/first': 'error',
      'import-x/newline-after-import': [
        'error',
        {
          count: 1,
          exactCount: true,
          considerComments: false,
        },
      ],
      'import-x/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        },
      ],
      'import-x/exports-last': 'error',
      'import-x/group-exports': 'error',
    },
  },
]
