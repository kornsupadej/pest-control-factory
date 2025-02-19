import { describe, expect, test } from 'vitest'

import NodeJSConfig from '../../../../libs/configs/main/nodejs'
import { baseFixture } from '../../../fixtures/nodejs/base'
import { extendedFixture } from '../../../fixtures/nodejs/extended'
import { typescriptFixture } from '../../../fixtures/nodejs/typescript'

describe.only('#NodeJSConfig', () => {
  test('return base result correctly', () => {
    const instance = new NodeJSConfig(
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
    /** ensure node env variables */
    expect(result[0].languageOptions).toBeDefined()
    /** should not create plugin obj in base case not provided options */
    expect(result[0].plugins).not.toBeDefined()
  })

  test('return extended result correctly', () => {
    const instance = new NodeJSConfig(
      {
        files: ['**/*.testfilepathext'],
        ignores: ['**/*.testignorepathext'],
        languageOptions: {
          foo: 'foo',
        },
        plugins: {
          baz: 'qux',
        },
        rules: {
          bar: 'bar',
        },
      },
      false
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(extendedFixture)
    expect(result[0].languageOptions.foo).toBeDefined()
    expect(result[0].plugins.baz).toBeDefined()
    expect(result[0].rules.bar).toBeDefined()
  })

  test('return typescript result correctly', () => {
    const instance = new NodeJSConfig(
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
    /** ensure typescript parser */
    expect(result[0].languageOptions.parser).toBeDefined()
    /** ensure typescript plugin */
    expect(result[0].plugins['@typescript-eslint']).toBeDefined()
  })
})
