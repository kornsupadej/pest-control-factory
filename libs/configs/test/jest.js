import jest from 'eslint-plugin-jest'

import ESLintConfig from '../index.js'

import { GLOB_PATTERNS } from '../../constants.js'

/**
 * @extends ESLintConfig
 */
class JestConfig extends ESLintConfig {
  /**
   * @constructor
   * @param {import('../../index').Linter.ConfigOptions} linterOptions
   * @param {boolean} typescript
   */
  constructor(linterOptions, typescript) {
    super(linterOptions, typescript)
  }

  /**
   * @override
   * @returns {import("eslint").Linter.Config[]}
   */
  getESLintFlatConfig() {
    const { files, ignores, languageOptions, rules } = this.linterOptions
    return [
      {
        name: 'pest-control/jest',
        languageOptions: {
          globals: jest.environments.globals.globals,
        },
        files: [...GLOB_PATTERNS.ALL_TEST_FILES, ...files],
        ...(ignores && { ignores }),
        ...(Object.keys(languageOptions).length && { languageOptions }),
        plugins: {
          jest,
        },
        rules: {
          ...jest.configs['flat/recommended'].rules,
          'jest/consistent-test-it': ['error', { fn: 'test' }],
          'jest/valid-title': 'error',
          'jest/no-done-callback': 'error',
          'jest/expect-expect': 'off',
          ...rules,
        },
      },
    ]
  }
}
export default JestConfig
