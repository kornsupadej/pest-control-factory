import { describe, test, expect } from 'vitest'

import VitestConfig from '../../../../libs/configs/test/vitest'
import { baseFixture } from '../../../fixtures/vitest/base'
import { extendedFixture } from '../../../fixtures/vitest/extended'

describe('#VitestConfig', () => {
  test('return base result correctly', () => {
    const instance = new VitestConfig(
      { files: [], ignores: [], languageOptions: {}, rules: {} },
      false
    )
    const result = instance.getESLintFlatConfig()
    expect(result).toEqual(baseFixture)
  })

  test.skip('return extended result correctly', () => {
    const instance = new VitestConfig(
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
