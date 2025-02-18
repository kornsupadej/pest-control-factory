import js from '@eslint/js'
import globals from 'globals'

import { GLOB_PATTERNS } from '../../../libs/constants'
import { CJSFixture } from './cjs'
import { ESMFixture } from './esm'

export const baseFixture = [
  {
    name: 'pest-control/nodejs',
    files: [GLOB_PATTERNS.ALL_BASE_EXTENSION_FILES],
    ignores: [...GLOB_PATTERNS.BASIC_IGNORE_PATHS],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  ...CJSFixture,
  ...ESMFixture,
]
