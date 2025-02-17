import js from "@eslint/js";
import globals from "globals";
import eslintPluginNode from "eslint-plugin-n";

import ESLintConfig from "../index.js";

import { GLOB_PATTERNS } from "../../constants.js";

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
   * @returns {import("eslint").Linter.Config[]}
   */
  _buildTSLintConfig() {
    const ts = require("typescript-eslint");
    return {
      ...ts.configs.recommendedTypeChecked,
      languageOptions: {
        parser: ts.parser,
        parserOptions: {
          project: ["tsconfig?(.*).json"],
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
      plugins: {
        "@typescript-eslint": ts.plugin,
      },
      rules: {
        ...ts.configs.recommendedTypeChecked.rules,
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: false,
            checksConditionals: false,
          },
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-function-type": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/prefer-promise-reject-errors": "off",
        "@typescript-eslint/no-base-to-string": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/only-throw-error": "off",
      },
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
    const tsConfig = this.typescript ? this._buildTSLintConfig() : {};
    return {
      name: "pest-control/nodejs",
      files: [GLOB_PATTERNS.ALL_BASE_EXTENSION_FILES, ...files],
      ignores: [...GLOB_PATTERNS.BASIC_IGNORE_PATHS, ...ignores],
      ...(tsConfig.plugins && { plugins: tsConfig.plugins }),
      languageOptions: {
        globals: {
          ...globals.node,
        },
        ...(tsConfig.languageOptions && { ...tsConfig.languageOptions }),
        ...languageOptions,
      },
      rules: {
        ...js.configs.recommended.rules,
        ...(tsConfig.rules && { ...tsConfig.rules }),
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
