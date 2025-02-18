import eslintPluginImportX from 'eslint-plugin-import-x'

import { GLOB_PATTERNS } from '../../../libs/constants'

export const extendedFixture = [
  {
    ...eslintPluginImportX.flatConfigs.recommended,
    name: 'pest-control/formatting',
    files: [GLOB_PATTERNS.ALL_BASE_EXTENSION_FILES, '**/*.testfilepathext'],
    ignores: [...GLOB_PATTERNS.BASIC_IGNORE_PATHS, '**/*.testignorepathext'],
    languageOptions: {
      foo: 'bar',
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
      foo: 'bar',
    },
  },
]
