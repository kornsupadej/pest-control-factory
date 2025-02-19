import { describe, expect, test } from 'vitest'

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
        plugins: {},
        rules: {},
      },
      false
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(baseFixture)
    /** ensure import-x options and plugin */
    expect(result[0].plugins['import-x']).toBeDefined()
    expect(result[0].languageOptions.ecmaVersion).toBeDefined()
    expect(result[0].languageOptions.sourceType).toBeDefined()
    /** ensure prettier plugin */
    expect(result[0].plugins['prettier']).toBeDefined()
  })

  test('return extended result correctly', () => {
    const instance = new PrettierConfig(
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
    /** ensure import-x options and plugin */
    expect(result[0].plugins['import-x']).toBeDefined()
    expect(result[0].languageOptions.ecmaVersion).toBeDefined()
    expect(result[0].languageOptions.sourceType).toBeDefined()
    /** ensure prettier plugin */
    expect(result[0].plugins['prettier']).toBeDefined()
    /** ensure additional config option  */
    expect(result[0].languageOptions.foo).toBeDefined()
    expect(result[0].plugins.baz).toBeDefined()

    expect(result[0].rules.foo).toBeDefined()
  })

  test('return typescript result correctly', () => {
    const instance = new PrettierConfig(
      {
        files: [],
        ignores: [],
        languageOptions: {},
        plugins: {},
        rules: {},
      },
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
