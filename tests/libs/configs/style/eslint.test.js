import { describe, expect, test } from 'vitest'

import FormattingConfig from '../../../../libs/configs/style/eslint'
import { baseFixture } from '../../../fixtures/eslint/base'
import { extendedFixture } from '../../../fixtures/eslint/extended'
import { typescriptFixture } from '../../../fixtures/eslint/typescript'

describe('#FormattingConfig', () => {
  test('return base result correctly', () => {
    const instance = new FormattingConfig(
      { files: [], ignores: [], languageOptions: {}, plugins: {}, rules: {} },
      false
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(baseFixture)
    /** ensure import-x options */
    expect(result[0].plugins['import-x']).toBeDefined()
    expect(result[0].languageOptions.ecmaVersion).toBeDefined()
    expect(result[0].languageOptions.sourceType).toBeDefined()
  })

  test('return extended result correctly', () => {
    const instance = new FormattingConfig(
      {
        files: ['**/*.testfilepathext'],
        ignores: ['**/*.testignorepathext'],
        languageOptions: {
          foo: 'bar',
        },
        plugins: {
          baz: 'qux',
        },
        rules: {
          foo: 'bar',
        },
      },
      false
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(extendedFixture)

    expect(result[0].languageOptions.foo).toBeDefined()
    /** ensure import-x options */
    expect(result[0].languageOptions.ecmaVersion).toBeDefined()
    expect(result[0].languageOptions.sourceType).toBeDefined()
    /** ensure import-x plugin */
    expect(result[0].plugins['import-x']).toBeDefined()
    expect(result[0].plugins.baz).toBeDefined()

    expect(result[0].rules.foo).toBeDefined()
  })

  test('return typescript result correctly', () => {
    const instance = new FormattingConfig(
      { files: [], ignores: [], languageOptions: {}, plugins: {}, rules: {} },
      true
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(typescriptFixture)
    /** ensure necessary settings for import-x & typescript rules */
    expect(result[0].settings).toBeDefined()
    expect(result[0].rules['import-x/named']).toBeDefined()
    expect(result[0].rules['import-x/named']).toEqual('off')
  })
})
