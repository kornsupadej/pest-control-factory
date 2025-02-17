import eslintPluginImportX from "eslint-plugin-import-x";

import ESLintConfig from "../index.js";

const ALL_JS_FILES = "**/*.{js,mjs,cjs,ts,mts,cts}";
const BASIC_IGNORES = [
  "**/node_modules/",
  "**/dist/",
  "**/*.d.ts",
  "eslint.config.{js,mjs,cjs,ts,mts,cts}",
];

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
   * @override
   * @returns {import("eslint").Linter.Config[]}
   */
  getESLintFlatConfig() {
    const { files, ignores, languageOptions, rules } = this.linterOptions;
    return [
      {
        ...eslintPluginImportX.flatConfigs.recommended,
        name: "pest-control/formatting",
        files: [ALL_JS_FILES, ...files],
        ignores: [...BASIC_IGNORES, ...ignores],
        ...(Object.keys(languageOptions).length && { languageOptions }),
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
