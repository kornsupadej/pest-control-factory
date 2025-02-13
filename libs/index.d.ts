/** static types */
declare namespace Linter {
  export type FlatConfigs = import("eslint").Linter.Config[];
  export type RulesRecord = import("eslint").Linter.RulesRecord;
  export type ConfigOptions = Pick<
    import("eslint").Linter.Config,
    "files" | "ignores" | "languageOptions" | "rules"
  >;
}
export type LinterTypes =
  | "cjs"
  | "js"
  | "nodejs"
  | "react"
  | "next"
  | "angular"
  | "vue";
export type StyleLinterTypes = "eslint" | "prettier" | "biome";
export type TestLinterTypes = "jest" | "vitest" | "mocha";
export type LinterConfig<Types> = {
  type: Types;
  options: Linter.ConfigOptions;
};
/** package options */
export type CreateESLintConfigOptions = {
  /**
   * this option is crucial for eslint to perform
   * code-quality analysis appropriately
   * based on your project contruction & purposes
   */
  linter: LinterOptions<LinterTypes>;
  /**
   * this option is crucial for eslint to perform
   * code-formatting (convention) appropriately
   * TIPS:
   *  - install extensions based on your selected type
   *    to be able to format code on the fly.
   *    otherwise it will just shout at you
   *    and you have to fix it manually.
   */
  styleLinter?: LinterOptions<StyleLinterTypes>;
  /**
   * enable linting rules based on your testing framework
   * (i,e) jest, mocha, vitest etc.
   */
  testLinter?: LinterOptions<TestLinterTypes>;
  /**
   * enable this if the project is using typescript to ensure
   * a consistent behavior of eslint in your project
   * @default false
   */
  typescript?: boolean;
};

export declare function formulatePesticide(
  options: CreateESLintConfigOptions
): Linter.FlatConfigs;
