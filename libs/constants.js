export const GLOB_PATTERNS = Object.freeze({
  ALL_BASE_EXTENSION_FILES: '**/*.{js,mjs,cjs,jsx,mjsx,ts,mts,cts,tsx,mtsx}',
  BASIC_IGNORE_PATHS: [
    '**/node_modules/',
    '**/dist/',
    '**/*.d.ts',
    'eslint.config.{js,mjs,cjs,ts,mts,cts}',
  ],
  ALL_TEST_FILES: '**/*.?(e2e-){test,spec}.{js,ts}',
})
export const SUPPORTED_TYPES = Object.freeze({
  CJS: 'cjs',
  ESM: 'esm',
  NODEJS: 'nodejs',
  REACT: 'react',
  NEXTJS: 'nextjs',
  ANGULAR: 'angular',
  VUE: 'vue',
  JEST: 'jest',
  VITEST: 'vitest',
  ESLINT: 'eslint',
  PRETTIER: 'prettier',
})
