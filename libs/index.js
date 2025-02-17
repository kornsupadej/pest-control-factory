import ConfigProxy from './configs/proxy.js'

/** @type {import('./index').formulatePesticide} */
function formulatePesticide(options = {}) {
  const eslintConfigObject = {
    main: new ConfigProxy(
      options.linter,
      options.typescript
    ).resolveESLintConfig(),
    test: new ConfigProxy(
      options.testLinter,
      options.typescript
    ).resolveESLintConfig(),
    style: new ConfigProxy(
      options.styleLinter,
      options.typescript
    ).resolveESLintConfig(),
  }
  return [
    ...eslintConfigObject.main,
    ...eslintConfigObject.test,
    ...eslintConfigObject.style,
  ]
}

export { formulatePesticide }
