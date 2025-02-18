import vitest from '@vitest/eslint-plugin'

import { GLOB_PATTERNS } from '../../../libs/constants'

export const extendedFixture = [
  {
    name: 'pest-control/vitest',
    files: [...GLOB_PATTERNS.ALL_TEST_FILES, '**/*.testfilepathext'],
    ignores: ['**/*.testignorepathext'],
    languageOptions: {
      globals: vitest.environments.env.globals,
      foo: 'bar',
    },
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/valid-title': 'error',
      'vitest/no-done-callback': 'error',
      'vitest/expect-expect': 'off',
      foo: 'bar',
    },
  },
]
