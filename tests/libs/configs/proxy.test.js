import { describe, test, expect } from 'vitest'

import ConfigProxy from '../../../libs/configs/proxy'
import { baseFixture } from '../../fixtures/nodejs/base'
import { SUPPORTED_TYPES } from '../../../libs/constants'

describe('#ConfigProxy', () => {
  test('resolve default module on undefined', () => {
    const instance = new ConfigProxy(undefined, undefined)
    const result = instance.resolveESLintConfig()
    expect(result).toEqual([])
  })

  test('resolve default module on unsopported', () => {
    const instance = new ConfigProxy({ type: 'foo' }, undefined)
    const result = instance.resolveESLintConfig()
    expect(result).toEqual([])
  })

  test.skip(`resolve ${SUPPORTED_TYPES.NODEJS} module correctly`, () => {
    const instance = new ConfigProxy(
      {
        type: [SUPPORTED_TYPES.NODEJS],
      },
      undefined
    )
    const result = instance.resolveESLintConfig()
    expect(result).toEqual(baseFixture)
  })
})
