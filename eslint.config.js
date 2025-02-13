import js from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["eslint.config.js", "node_modules"] },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
