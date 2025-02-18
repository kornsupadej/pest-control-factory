import jest from 'eslint-plugin-jest'

import { GLOB_PATTERNS } from '../../../libs/constants'

export const extendedFixture = [
  {
    name: 'pest-control/jest',
    files: [...GLOB_PATTERNS.ALL_TEST_FILES, '**/*.testfilepathext'],
    ignores: ['**/*.testignorepathext'],
    languageOptions: {
      globals: jest.environments.globals.globals,
      foo: 'bar',
    },
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/consistent-test-it': ['error', { fn: 'test' }],
      'jest/valid-title': 'error',
      'jest/no-done-callback': 'error',
      'jest/expect-expect': 'off',
      foo: 'bar',
    },
  },
]
