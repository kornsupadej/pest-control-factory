# pest-control-factory

A toolbox to minimize bug infestation in projects with your favorite tools!

Powered-by:

- [ESLint](https://eslint.org/docs/latest/),
- [Prettier](https://prettier.io/docs/)
- [Typescript-ESLint](https://typescript-eslint.io/getting-started/)

## Installation

```bash
  npm install @kornsupadej/pest-control-factory
```

## API Reference

#### Formulate pesticide(s) suitable for your project.

```js
formulatePesticide((options = {}))
```

#### Options

| Parameter     | Type              | Description           |
| :------------ | :---------------- | :-------------------- |
| `linter`      | `LinterConfig<T>` | **Main Linter**       |
| `styleLinter` | `LinterConfig<T>` | **Stylistic Linter**  |
| `testLinter`  | `LinterConfig<T>` | **Test Suite Linter** |

#### LinterConfig

| Parameter | Type            | Description                           |
| :-------- | :-------------- | :------------------------------------ |
| `type`    | `LinterType`    | **Type of tool using in the project** |
| `options` | `ConfigOptions` | **ESLint Linter.Config**              |

**NOTE:** See more at [ESLint](https://eslint.org/docs/latest/use/configure/configuration-files)
