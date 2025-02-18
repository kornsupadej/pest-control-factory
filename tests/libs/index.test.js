import { describe, expect, test, vi } from 'vitest'

import { formulatePesticide } from '../../libs'
import ConfigProxy from '../../libs/configs/proxy'
import { SUPPORTED_TYPES } from '../../libs/constants'

describe('#formulatePesticide', () => {
  test('return empty array if linter.type is not provided', () => {
    const result = formulatePesticide({})
    expect(result).toEqual([])
  })

  test('return empty array if linter.type is not supported', () => {
    const result = formulatePesticide({})
    expect(result).toEqual([])
  })

  test('ConfigProxy should be called three times', () => {
    const configProxySpy = vi.spyOn(
      ConfigProxy.prototype,
      'resolveESLintConfig'
    )
    formulatePesticide({
      linter: {
        type: [SUPPORTED_TYPES.NODEJS],
      },
    })
    expect(configProxySpy).toBeCalledTimes(3)
  })
})
