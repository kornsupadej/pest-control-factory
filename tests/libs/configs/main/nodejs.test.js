import { describe, test, expect } from 'vitest'

import NodeJSConfig from '../../../../libs/configs/main/nodejs'

import { baseFixture } from '../../../fixtures/nodejs/base'
import { extendedFixture } from '../../../fixtures/nodejs/extended'
import { typescriptFixture } from '../../../fixtures/nodejs/typescript'

describe('#NodeJSConfig', () => {
  test('return base result correctly', () => {
    const instance = new NodeJSConfig(
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
    const instance = new NodeJSConfig(
      {
        files: ['**/*.testfilepathext'],
        ignores: ['**/*.testignorepathext'],
        languageOptions: {
          foo: 'foo',
        },
        rules: {
          bar: 'bar',
        },
      },
      false
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(extendedFixture)
  })

  test('return typescript result correctly', () => {
    const instance = new NodeJSConfig(
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
