import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
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
class PrettierConfig extends ESLintConfig {
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
        ...eslintPluginPrettierRecommended,
        name: "pest-control/prettier",
        files: [ALL_JS_FILES, ...files],
        ignores: [...BASIC_IGNORES, ...ignores],
        ...(Object.keys(languageOptions).length && { languageOptions }),
        plugins: {
          ...eslintPluginImportX.configs.recommended.plugins,
          ...eslintPluginPrettierRecommended.plugins,
        },
        rules: {
          ...eslintPluginImportX.configs.recommended.rules,
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
          ...eslintPluginPrettierRecommended.rules,
          "prettier/prettier": [
            "error",
            {
              printWidth: 80,
              tabWidth: 4,
              bracketSpacing: true,
              singleQuote: true,
              trailingComma: "es5",
              semi: false,
              arrowParens: "avoid",
              endOfLine: "lf",
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
    ];
  }
}
export default PrettierConfig;
