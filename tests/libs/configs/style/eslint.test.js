import { describe, test, expect } from 'vitest'

import FormattingConfig from '../../../../libs/configs/style/eslint'
import { baseFixture } from '../../../fixtures/eslint/base'
import { extendedFixture } from '../../../fixtures/eslint/extended'
import { typescriptFixture } from '../../../fixtures/eslint/typescript'

describe('#FormattingConfig', () => {
  test('return base result correctly', () => {
    const instance = new FormattingConfig(
      { files: [], ignores: [], languageOptions: {}, rules: {} },
      false
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(baseFixture)
  })

  test('return extended result correctly', () => {
    const instance = new FormattingConfig(
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
    const instance = new FormattingConfig(
      { files: [], ignores: [], languageOptions: {}, rules: {} },
      true
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(typescriptFixture)
  })
})
