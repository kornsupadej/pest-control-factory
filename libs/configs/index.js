import chalk from "chalk";

/**
 * @class
 * @classdesc Parant class for resolving configs
 * @name ESLintStyleConfig
 */
class ESLintConfig {
  /**
   * @constructor
   * @param {import('../index').Linter.ConfigOptions} linterOptions
   * @param {boolean} typescript
   */
  constructor(linterOptions, typescript) {
    this.linterOptions = linterOptions;
    this.typescript = typescript;
  }

  /**
   * @method
   * @returns {import("eslint").Linter.Config[]}
   */
  getESLintFlatConfig() {
    console.log(
      chalk.bgRed(" ERROR "),
      chalk.red("No primary linter config was applied.")
    );
    return [];
  }
}
export default ESLintConfig;
