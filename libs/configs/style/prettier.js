import eslintPluginImportX from 'eslint-plugin-import-x'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import mergeDeep from 'merge-deep'
import mixinDeep from 'mixin-deep'
import { parser } from 'typescript-eslint'

import { GLOB_PATTERNS } from '../../constants.js'
import ESLintConfig from '../index.js'

/**
 * @extends ESLintConfig
 */
class PrettierConfig extends ESLintConfig {
  /**
   * @constructor
   * @param {import('../../index').Linter.ConfigOptions} linterOptions
   * @param {boolean} typescript
   */
  constructor(linterOptions, typescript) {
    super(linterOptions, typescript)
  }

  /**
   * @private
   * @method
   * @name _buildRecommendedConfig
   *
   * @returns {import("eslint").Linter.Config}
   */
  _buildRecommendedConfig() {
    const recommendedConfig = mergeDeep(
      eslintPluginImportX.flatConfigs.recommended,
      eslintPluginPrettierRecommended
    )
    if (this.typescript) {
      mixinDeep(recommendedConfig, eslintPluginImportX.flatConfigs.typescript)
    }
    return recommendedConfig
  }

  /**
   * @private
   * @method
   * @name _buildLanguageOptions
   *
   * @returns {import("eslint").Linter.Config} languageOptionsConfig
   */
  _buildLanguageOptions() {
    const languageOptions = mergeDeep(
      eslintPluginImportX.flatConfigs.recommended.languageOptions,
      this.linterOptions.languageOptions
    )
    if (this.typescript) {
      mixinDeep(languageOptions, {
        parser,
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
    let configOptions = {
      plugins: {
        ...eslintPluginImportX.flatConfigs.recommended.plugins,
        ...eslintPluginPrettierRecommended.plugins,
        ...plugins,
      },
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
      ...eslintPluginImportX.flatConfigs.recommended.rules,
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],
      'import-x/first': 'error',
      'import-x/newline-after-import': [
        'error',
        {
          count: 1,
          exactCount: true,
          considerComments: false,
        },
      ],
      'import-x/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        },
      ],
      'import-x/exports-last': 'error',
      'import-x/group-exports': 'error',
    }
    if (this.typescript) {
      Object.assign(rules, {
        ...eslintPluginImportX.flatConfigs.typescript.rules,
      })
    }
    Object.assign(rules, {
      ...eslintPluginPrettierRecommended.rules,
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 4,
          bracketSpacing: true,
          singleQuote: true,
          trailingComma: 'es5',
          semi: false,
          arrowParens: 'avoid',
          endOfLine: 'lf',
        },
        {
          usePrettierrc: false,
          fileInfoOptions: {
            withNodeModules: false,
          },
        },
      ],
    })
    return rules
  }

  /**
   * @override
   * @returns {import("eslint").Linter.Config[]}
   */
  getESLintFlatConfig() {
    const { files, ignores, rules } = this.linterOptions
    return [
      {
        ...this._buildRecommendedConfig(),
        name: 'pest-control/prettier',
        files: [GLOB_PATTERNS.ALL_BASE_EXTENSION_FILES, ...files],
        ignores: [...GLOB_PATTERNS.BASIC_IGNORE_PATHS, ...ignores],
        ...this._buildLanguageOptions(),
        ...this._buildPlugins(),
        rules: {
          ...this._buildRules(),
          ...rules,
        },
      },
    ]
  }
}
export default PrettierConfig
