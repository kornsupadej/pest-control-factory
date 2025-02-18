import { describe, expect, test } from 'vitest'

import ESLintConfig from '../../../libs/configs/index'

describe('#ESLintConfig', () => {
  test('return base config correctly', () => {
    const instance = new ESLintConfig(
      {
        files: [],
        ignores: [],
        languageOptions: {},
        rules: {},
      },
      false
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual([])
  })
})
