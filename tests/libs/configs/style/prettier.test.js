import { describe, test, expect } from 'vitest'

import PrettierConfig from '../../../../libs/configs/style/prettier'
import { baseFixture } from '../../../fixtures/prettier/base'
import { extendedFixture } from '../../../fixtures/prettier/extended'
import { typescriptFixture } from '../../../fixtures/prettier/typescript'

describe('#PrettierConfig', () => {
  test('return base result correctly', () => {
    const instance = new PrettierConfig(
      {
        files: [],
        ignores: [],
        languageOptions: {},
        rules: {},
      },
      false
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(baseFixture)
  })

  test('return extended result correctly', () => {
    const instance = new PrettierConfig(
      {
        files: ['**/*.testfilepathext'],
        ignores: ['**/*.testignorepathext'],
        languageOptions: {
          foo: 'bar',
        },
        rules: {
          foo: 'bar',
        },
      },
      false
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(extendedFixture)
  })

  test('return typescript result correctly', () => {
    const instance = new PrettierConfig(
      {
        files: [],
        ignores: [],
        languageOptions: {},
        rules: {},
      },
      true
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(typescriptFixture)
  })
})
