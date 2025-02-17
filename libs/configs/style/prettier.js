import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginImportX from 'eslint-plugin-import-x'

import ESLintConfig from '../index.js'

import { GLOB_PATTERNS } from '../../constants.js'

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
   * @name _buildTSLintConfig
   *
   * @returns {import("eslint").Linter.Config[]}
   */
  _buildTSLintConfig() {
    const ts = require('typescript-eslint')
    return {
      languageOptions: {
        parser: ts.parser,
      },
    }
  }

  /**
   * @private
   * @method
   * @name _buildLanguageOptions
   *
   * @returns {import("eslint").Linter.Config[]}
   */
  _buildLanguageOptions() {
    const { languageOptions } = this.linterOptions
    const options = {}
    if (Object.keys(languageOptions).length) {
      Object.assign(options, {
        languageOptions: {
          ...languageOptions,
        },
      })
    }
    if (this.typescript) {
      Object.assign(options, {
        languageOptions: {
          ...this._buildTSLintConfig().languageOptions,
        },
      })
    }
    return options
  }

  /**
   * @override
   * @returns {import("eslint").Linter.Config[]}
   */
  getESLintFlatConfig() {
    const { files, ignores, rules } = this.linterOptions
    return [
      {
        ...eslintPluginPrettierRecommended,
        ...(this.typescript && eslintPluginImportX.flatConfigs.typescript),
        name: 'pest-control/prettier',
        files: [GLOB_PATTERNS.ALL_BASE_EXTENSION_FILES, ...files],
        ignores: [...GLOB_PATTERNS.BASIC_IGNORE_PATHS, ...ignores],
        ...this._buildLanguageOptions(),
        plugins: {
          ...eslintPluginImportX.flatConfigs.recommended.plugins,
          ...eslintPluginPrettierRecommended.plugins,
        },
        rules: {
          ...eslintPluginImportX.configs.recommended.rules,
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
              ...rules,
            },
            {
              usePrettierrc: false,
              fileInfoOptions: {
                withNodeModules: false,
              },
            },
          ],
        },
      },
    ]
  }
}
export default PrettierConfig
