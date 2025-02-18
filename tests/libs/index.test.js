import { vi, describe, test, expect } from 'vitest'

import ConfigProxy from '../../libs/configs/proxy'
import { formulatePesticide } from '../../libs'

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
        type: 'nodejs',
      },
    })
    expect(configProxySpy).toBeCalledTimes(3)
  })
})
