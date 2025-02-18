import vitest from '@vitest/eslint-plugin'

import { GLOB_PATTERNS } from '../../../libs/constants'

export const baseFixture = [
  {
    name: 'pest-control/vitest',
    files: [...GLOB_PATTERNS.ALL_TEST_FILES],
    languageOptions: {
      globals: vitest.environments.env.globals,
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
    },
  },
]
