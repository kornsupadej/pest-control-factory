import { afterEach, describe, expect, test, vi } from 'vitest'

import ESLintConfig from '../../../libs/configs'
import NodeJSConfig from '../../../libs/configs/main/nodejs'
import ConfigProxy from '../../../libs/configs/proxy'
import FormattingConfig from '../../../libs/configs/style/eslint'
import PrettierConfig from '../../../libs/configs/style/prettier'
import JestConfig from '../../../libs/configs/test/jest'
import VitestConfig from '../../../libs/configs/test/vitest'
import { SUPPORTED_TYPES } from '../../../libs/constants'
import { baseFixture as eslintBaseFixture } from '../../fixtures/eslint/base'
import { baseFixture as jestBaseFixture } from '../../fixtures/jest/base'
import { baseFixture as nodejsBaseFixture } from '../../fixtures/nodejs/base'
import { baseFixture as prettierBaseFixture } from '../../fixtures/prettier/base'
import { baseFixture as vitestBaseFixture } from '../../fixtures/vitest/base'

describe('#ConfigProxy', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('resolve default module on undefined', () => {
    const getterSpy = vi.spyOn(ESLintConfig.prototype, 'getESLintFlatConfig')
    const instance = new ConfigProxy(undefined, undefined)
    const result = instance.resolveESLintConfig()
    expect(getterSpy).toBeCalledTimes(1)
    expect(result).toEqual([])
  })

  test('resolve default module on unsopported', () => {
    const getterSpy = vi.spyOn(ESLintConfig.prototype, 'getESLintFlatConfig')
    const instance = new ConfigProxy({ type: 'foo' }, undefined)
    const result = instance.resolveESLintConfig()
    expect(getterSpy).toBeCalledTimes(1)
    expect(result).toEqual([])
  })

  test(`resolve ${SUPPORTED_TYPES.NODEJS} module correctly`, () => {
    const getterSpy = vi.spyOn(NodeJSConfig.prototype, 'getESLintFlatConfig')
    const instance = new ConfigProxy(
      {
        type: SUPPORTED_TYPES.NODEJS,
      },
      undefined
    )
    const result = instance.resolveESLintConfig()
    expect(getterSpy).toBeCalledTimes(1)
    expect(result).toEqual(nodejsBaseFixture)
  })

  test(`resolve ${SUPPORTED_TYPES.ESLINT} module correctly`, () => {
    const getterSpy = vi.spyOn(
      FormattingConfig.prototype,
      'getESLintFlatConfig'
    )
    const instance = new ConfigProxy(
      {
        type: SUPPORTED_TYPES.ESLINT,
      },
      undefined
    )
    const result = instance.resolveESLintConfig()
    expect(getterSpy).toBeCalledTimes(1)
    expect(result).toEqual(eslintBaseFixture)
  })

  test(`resolve ${SUPPORTED_TYPES.PRETTIER} module correctly`, () => {
    const getterSpy = vi.spyOn(PrettierConfig.prototype, 'getESLintFlatConfig')
    const instance = new ConfigProxy(
      {
        type: SUPPORTED_TYPES.PRETTIER,
      },
      undefined
    )
    const result = instance.resolveESLintConfig()
    expect(getterSpy).toBeCalledTimes(1)
    expect(result).toEqual(prettierBaseFixture)
  })

  test(`resolve ${SUPPORTED_TYPES.JEST} module correctly`, () => {
    const getterSpy = vi.spyOn(JestConfig.prototype, 'getESLintFlatConfig')
    const instance = new ConfigProxy(
      {
        type: SUPPORTED_TYPES.JEST,
      },
      undefined
    )
    const result = instance.resolveESLintConfig()
    expect(getterSpy).toBeCalledTimes(1)
    expect(result).toEqual(jestBaseFixture)
  })

  test(`resolve ${SUPPORTED_TYPES.VITEST} module correctly`, () => {
    const getterSpy = vi.spyOn(VitestConfig.prototype, 'getESLintFlatConfig')
    const instance = new ConfigProxy(
      {
        type: SUPPORTED_TYPES.VITEST,
      },
      undefined
    )
    const result = instance.resolveESLintConfig()
    expect(getterSpy).toBeCalledTimes(1)
    expect(result).toEqual(vitestBaseFixture)
  })
})
