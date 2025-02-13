import vitest from "@vitest/eslint-plugin";

import ESLintConfig from "../index.js";

const ALL_TEST_FILES = "**/*.?(e2e-){test,spec}.{js,ts}";

/**
 * @extends ESLintConfig
 */
class VitestConfig extends ESLintConfig {
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
        name: "pest-control/vitest",
        languageOptions: {
          globals: vitest.environments.env.globals,
        },
        files: [...ALL_TEST_FILES, ...files],
        ...(ignores && { ignores }),
        ...(Object.keys(languageOptions).length && { languageOptions }),
        plugins: {
          vitest,
        },
        rules: {
          ...vitest.configs.recommended.rules,
          "vitest/consistent-test-it": ["error", { fn: "test" }],
          "vitest/valid-title": "error",
          "vitest/no-done-callback": "error",
          "vitest/expect-expect": "off",
          ...rules,
        },
      },
    ];
  }
}
export default VitestConfig;
