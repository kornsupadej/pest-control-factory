import js from "@eslint/js";
import globals from "globals";
import eslintPluginNode from "eslint-plugin-n";

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
class NodeJSConfig extends ESLintConfig {
  /**
   * @constructor
   * @param {import("../../index").Linter.ConfigOptions} linterOptions
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
   * @returns {import("eslint").Linter.Config}
   */
  _buildTSLintConfig() {
    // TODO: implement TS Config
    // - parser, rules
    return {
      parser: {},
      rules: {},
    };
  }

  /**
   * @private
   * @method
   * @name _buildLintConfig
   *
   * @returns {import("eslint").Linter.Config}
   */
  _buildLintConfig() {
    const { files, ignores, languageOptions, rules } = this.linterOptions;

    const tsLintConfig = this._buildTSLintConfig();
    return {
      name: "pest-control/nodejs",
      files: [ALL_JS_FILES, ...files],
      ignores: [...BASIC_IGNORES, ...ignores],
      languageOptions: {
        globals: {
          ...globals.node,
        },
        ...languageOptions,
      },
      rules: {
        ...js.configs.recommended.rules,
        ...rules,
      },
    };
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
      name: "pest-control/cjs",
      files: ["**/*.cjs"],
      plugins: { n: eslintPluginNode },
      rules: {
        ...eslintPluginNode.configs["flat/recommended-script"].rules,
        "n/callback-return": ["error", ["cb", "callback", "next"]],
        "n/handle-callback-err": ["error", "err"],
        "n/prefer-node-protocol": "error",
        "n/no-mixed-requires": "error",
        "n/no-new-require": "error",
        "n/no-path-concat": "error",
      },
    };
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
      name: "pest-control/esm",
      files: ["**/*.js"],
      plugins: { n: eslintPluginNode },
      rules: {
        ...eslintPluginNode.configs["flat/recommended-module"].rules,
        "n/callback-return": ["error", ["cb", "callback", "next"]],
        "n/handle-callback-err": ["error", "err"],
        "n/prefer-node-protocol": "error",
      },
    };
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
    ];
    return eslintFlatConfig;
  }
}
export default NodeJSConfig;
