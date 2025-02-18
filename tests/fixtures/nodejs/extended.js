import js from '@eslint/js'
import globals from 'globals'

import { GLOB_PATTERNS } from '../../../libs/constants'
import { CJSFixture } from './cjs'
import { ESMFixture } from './esm'

export const extendedFixture = [
  {
    name: 'pest-control/nodejs',
    files: [GLOB_PATTERNS.ALL_BASE_EXTENSION_FILES, '**/*.testfilepathext'],
    ignores: [...GLOB_PATTERNS.BASIC_IGNORE_PATHS, '**/*.testignorepathext'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      foo: 'foo',
    },
    rules: {
      ...js.configs.recommended.rules,
      bar: 'bar',
    },
  },
  ...CJSFixture,
  ...ESMFixture,
]
