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
    return [];
  }
}
export default ESLintConfig;
