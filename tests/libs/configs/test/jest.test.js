import { describe, test, expect } from 'vitest'

import JestConfig from '../../../../libs/configs/test/jest'
import { baseFixture } from '../../../fixtures/jest/base'
import { extendedFixture } from '../../../fixtures/jest/extended'

describe('#JestConfig', () => {
  test('return base result correctly', () => {
    const instance = new JestConfig(
      { files: [], ignores: [], languageOptions: {}, rules: {} },
      false
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(baseFixture)
  })

  test.skip('return extended result correctly', () => {
    const instance = new JestConfig(
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
})
