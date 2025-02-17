export const GLOB_PATTERNS = {
  ALL_BASE_EXTENSION_FILES: "**/*.{js,mjs,cjs,jsx,mjsx,ts,mts,cts,tsx,mtsx}",
  BASIC_IGNORE_PATHS: [
    "**/node_modules/",
    "**/dist/",
    "**/*.d.ts",
    "eslint.config.{js,mjs,cjs,ts,mts,cts}",
  ],
  ALL_TEST_FILES: "**/*.?(e2e-){test,spec}.{js,ts}",
};
