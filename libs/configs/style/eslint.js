import eslintPluginImportX from "eslint-plugin-import-x";

import ESLintConfig from "../index.js";

import { GLOB_PATTERNS } from "../../constants.js";

/**
 * @extends ESLintConfig
 */
class FormattingConfig extends ESLintConfig {
  /**
   * @constructor
   * @param {import('../../index').Linter.ConfigOptions} linterOptions
   * @param {boolean} typescript
   */
  constructor(linterOptions, typescript) {
    super(linterOptions, typescript);
  }

  /**
   * @private
   * @method
   * @name _buildTSLintConfig
   *
   * @returns {import("eslint").Linter.Config[]}
   */
  _buildTSLintConfig() {
    const ts = require("typescript-eslint");
    return {
      languageOptions: {
        parser: ts.parser,
      },
    };
  }

  /**
   * @private
   * @method
   * @name _buildLanguageOptions
   *
   * @returns {import("eslint").Linter.Config[]}
   */
  _buildLanguageOptions() {
    const { languageOptions } = this.linterOptions;
    const options = {};
    if (Object.keys(languageOptions).length) {
      Object.assign(options, {
        languageOptions: {
          ...languageOptions,
        },
      });
    }
    if (this.typescript) {
      Object.assign(options, {
        languageOptions: {
          ...this._buildTSLintConfig().languageOptions,
        },
      });
    }
    return options;
  }

  /**
   * @override
   * @returns {import("eslint").Linter.Config[]}
   */
  getESLintFlatConfig() {
    const { files, ignores, rules } = this.linterOptions;
    return [
      {
        ...eslintPluginImportX.flatConfigs.recommended,
        ...(this.typescript && eslintPluginImportX.flatConfigs.typescript),
        name: "pest-control/formatting",
        files: [GLOB_PATTERNS.ALL_BASE_EXTENSION_FILES, ...files],
        ignores: [...GLOB_PATTERNS.BASIC_IGNORE_PATHS, ...ignores],
        ...this._buildLanguageOptions(),
        rules: {
          ...eslintPluginImportX.flatConfigs.recommended.rules,
          "no-multiple-empty-lines": [
            "error",
            {
              max: 1,
              maxEOF: 1,
              maxBOF: 0,
            },
          ],
          "import-x/first": "error",
          "import-x/newline-after-import": [
            "error",
            {
              count: 1,
              exactCount: true,
              considerComments: false,
            },
          ],
          "import-x/order": [
            "error",
            {
              alphabetize: {
                order: "asc",
                caseInsensitive: true,
              },
              "newlines-between": "always",
              groups: ["builtin", "external", "parent", "sibling", "index"],
            },
          ],
          "import-x/exports-last": "error",
          "import-x/group-exports": "error",
          ...rules,
        },
      },
    ];
  }
}
export default FormattingConfig;
