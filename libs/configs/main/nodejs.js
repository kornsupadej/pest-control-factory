import js from '@eslint/js'
import eslintPluginNode from 'eslint-plugin-n'
import globals from 'globals'
import mergeDeep from 'merge-deep'
import mixinDeep from 'mixin-deep'
import { configs, parser, plugin } from 'typescript-eslint'

import { GLOB_PATTERNS } from '../../constants.js'
import { isEmpty } from '../../utils/is-empty.js'
import ESLintConfig from '../index.js'

/**
 * @extends ESLintConfig
 */
class NodeJSConfig extends ESLintConfig {
  /**
   * @constructor
   * @param {import("../../index").Linter.ConfigOptions} linterOptions
   * @param {boolean} typescript
   */
  constructor(linterOptions, typescript) {
    super(linterOptions, typescript)
  }

  /**
   * @private
   * @method
   * @name _buildLanguageOptions
   *
   * @returns {import("eslint").Linter.Config}
   */
  _buildLanguageOptions() {
    const languageOptions = mergeDeep(
      { globals: globals.node },
      this.linterOptions.languageOptions
    )
    if (this.typescript) {
      mixinDeep(languageOptions, {
        parser,
        parserOptions: {
          project: ['tsconfig?(.*).json'],
          projectService: true,
          tsconfigRootDir: process.cwd(),
        },
      })
    }
    return { languageOptions }
  }

  /**
   * @private
   * @method
   * @name _buildPlugins
   *
   * @returns {import("eslint").Linter.Config}
   */
  _buildPlugins() {
    const { plugins } = this.linterOptions
    const configOptions = {}
    if (!isEmpty(plugins)) {
      Object.assign(configOptions, {
        plugins,
      })
    }
    if (this.typescript) {
      mixinDeep(configOptions, {
        plugins: {
          '@typescript-eslint': plugin,
        },
      })
    }
    return configOptions
  }

  /**
   * @private
   * @method
   * @name _buildRules
   *
   * @returns {import("eslint").Linter.RulesRecord}
   */
  _buildRules() {
    const rules = {
      ...js.configs.recommended.rules,
    }
    if (this.typescript) {
      Object.assign(rules, {
        ...configs.recommendedTypeChecked.rules,
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
            checksConditionals: false,
          },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-function-type': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/prefer-promise-reject-errors': 'off',
        '@typescript-eslint/no-base-to-string': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/only-throw-error': 'off',
      })
    }
    return rules
  }

  /**
   * @private
   * @method
   * @name _buildLintConfig
   *
   * @returns {import("eslint").Linter.Config}
   */
  _buildLintConfig() {
    const { files, ignores, rules } = this.linterOptions
    return {
      name: 'pest-control/nodejs',
      files: [GLOB_PATTERNS.ALL_BASE_EXTENSION_FILES, ...files],
      ignores: [...GLOB_PATTERNS.BASIC_IGNORE_PATHS, ...ignores],
      ...this._buildLanguageOptions(),
      ...this._buildPlugins(),
      rules: {
        ...this._buildRules(),
        ...rules,
      },
    }
  }

  /**
   * @private
   * @method
   * @name _buildCJSConfig
   *
   * @returns {import("eslint").Linter.Config}
   */
  _buildCJSConfig() {
    return {
      name: 'pest-control/cjs',
      files: ['**/*.cjs'],
      plugins: { n: eslintPluginNode },
      rules: {
        ...eslintPluginNode.configs['flat/recommended-script'].rules,
        'n/callback-return': ['error', ['cb', 'callback', 'next']],
        'n/handle-callback-err': ['error', 'err'],
        'n/prefer-node-protocol': 'error',
        'n/no-mixed-requires': 'error',
        'n/no-new-require': 'error',
        'n/no-path-concat': 'error',
      },
    }
  }

  /**
   * @private
   * @method
   * @name _buildESMConfig
   *
   * @returns {import("eslint").Linter.Config}
   */
  _buildESMConfig() {
    return {
      name: 'pest-control/esm',
      files: ['**/*.js'],
      plugins: { n: eslintPluginNode },
      rules: {
        ...eslintPluginNode.configs['flat/recommended-module'].rules,
        'n/callback-return': ['error', ['cb', 'callback', 'next']],
        'n/handle-callback-err': ['error', 'err'],
        'n/prefer-node-protocol': 'error',
      },
    }
  }

  /**
   * @override
   * @returns {import("eslint").Linter.Config[]}
   */
  getESLintFlatConfig() {
    const eslintFlatConfig = [
      this._buildLintConfig(),
      this._buildCJSConfig(),
      this._buildESMConfig(),
    ]
    return eslintFlatConfig
  }
}
export default NodeJSConfig
