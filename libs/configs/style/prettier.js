import prettierRecommended from "eslint-plugin-prettier/recommended";

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
        ...prettierRecommended,
        name: "pest-control/prettier",
        files: [ALL_JS_FILES, ...files],
        ignores: [...BASIC_IGNORES, ...ignores],
        ...(Object.keys(languageOptions).length && { languageOptions }),
        rules: {
          ...prettierRecommended.rules,
          "prettier/prettier": [
            "error",
            {
              bracketSpacing: true,
              singleQuote: true,
              trailingComma: "es5",
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
