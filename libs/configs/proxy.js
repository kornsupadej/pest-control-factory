import chalk from 'chalk'

import { SUPPORTED_TYPES } from '../constants.js'
import ESLintConfig from './index.js'
import NodeJSConfig from './main/nodejs.js'
import FormattingConfig from './style/eslint.js'
import PrettierConfig from './style/prettier.js'
import JestConfig from './test/jest.js'
import VitestConfig from './test/vitest.js'

const configClasses = Object.freeze({
  default: ESLintConfig,
  [SUPPORTED_TYPES.NODEJS]: NodeJSConfig,
  [SUPPORTED_TYPES.JEST]: JestConfig,
  [SUPPORTED_TYPES.VITEST]: VitestConfig,
  [SUPPORTED_TYPES.ESLINT]: FormattingConfig,
  [SUPPORTED_TYPES.PRETTIER]: PrettierConfig,
  /** not supported yet */
  [SUPPORTED_TYPES.CJS]: ESLintConfig,
  [SUPPORTED_TYPES.ESM]: ESLintConfig,
  [SUPPORTED_TYPES.REACT]: ESLintConfig,
  [SUPPORTED_TYPES.NEXTJS]: ESLintConfig,
  [SUPPORTED_TYPES.ANGULAR]: ESLintConfig,
  [SUPPORTED_TYPES.VUE]: ESLintConfig,
})

class ConfigProxy {
  /**
   * @constructor
   * @param {import('../index').LinterConfig<import("../index").LinterTypes | import("../index").TestLinterTypes | import("../index").StyleLinterTypes>} linterConfig
   * @param {boolean} typescript
   */
  constructor(linterConfig, typescript) {
    this.linterConfig = {
      type: linterConfig?.type || 'default',
      options: {
        files: linterConfig?.options?.files || [],
        ignores: linterConfig?.options?.ignores || [],
        languageOptions: linterConfig?.options?.languageOptions || {},
        plugins: linterConfig?.options?.plugins || {},
        rules: linterConfig?.options?.rules || {},
      },
    }
    this.typescript = typescript || false
  }

  /**
   * @private
   * @return {import('./index')} classInstance
   */
  _resolveModuleInstance() {
    const supported = [...Object.values(SUPPORTED_TYPES), 'default'].includes(
      this.linterConfig.type
    )
    if (!supported) {
      console.error(
        chalk.bgRed(' ERROR '),
        chalk.red(
          `Linter for "${this.linterConfig.type}" is not yet supported.`
        )
      )
      this.linterConfig.type = 'default'
    }
    return new configClasses[this.linterConfig.type](
      this.linterConfig.options,
      this.typescript
    )
  }

  /**
   * @type {import('eslint').Linter.Config[]}
   */
  resolveESLintConfig() {
    const moduleInstance = this._resolveModuleInstance()
    return moduleInstance.getESLintFlatConfig()
  }
}
export default ConfigProxy
