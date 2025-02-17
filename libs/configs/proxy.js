import chalk from 'chalk'

import ESLintConfig from './index.js'
import NodeJSConfig from './main/nodejs.js'

import JestConfig from './test/jest.js'
import VitestConfig from './test/vitest.js'

import FormattingConfig from './style/eslint.js'
import PrettierConfig from './style/prettier.js'

const configClasses = Object.freeze({
  default: ESLintConfig,
  nodejs: NodeJSConfig,
  jest: JestConfig,
  vitest: VitestConfig,
  eslint: FormattingConfig,
  prettier: PrettierConfig,
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
    const supported = Object.keys(configClasses).includes(
      this.linterConfig.type
    )
    if (!supported) {
      console.log(
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
