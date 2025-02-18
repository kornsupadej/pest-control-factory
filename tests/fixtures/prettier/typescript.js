import eslintPluginImportX from 'eslint-plugin-import-x'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import ts from 'typescript-eslint'

import { GLOB_PATTERNS } from '../../../libs/constants'

export const typescriptFixture = [
  {
    ...eslintPluginPrettierRecommended,
    ...eslintPluginImportX.flatConfigs.typescript,
    name: 'pest-control/prettier',
    files: [GLOB_PATTERNS.ALL_BASE_EXTENSION_FILES],
    ignores: [...GLOB_PATTERNS.BASIC_IGNORE_PATHS],
    languageOptions: {
      parser: ts.parser,
    },
    plugins: {
      ...eslintPluginImportX.flatConfigs.recommended.plugins,
      ...eslintPluginPrettierRecommended.plugins,
    },
    rules: {
      ...eslintPluginImportX.configs.recommended.rules,
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
      ...eslintPluginPrettierRecommended.rules,
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 4,
          bracketSpacing: true,
          singleQuote: true,
          trailingComma: 'es5',
          semi: false,
          arrowParens: 'avoid',
          endOfLine: 'lf',
        },
        {
          usePrettierrc: false,
          fileInfoOptions: {
            withNodeModules: false,
          },
        },
      ],
    },
  },
]
