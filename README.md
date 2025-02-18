
# :no_entry_sign: :bug: pest-control-factory

:toolbox: A toolbox to minimize bug infestation in projects with your favorite tools!

Powered-by:

- [ESLint](https://eslint.org/docs/latest/)
- [Prettier](https://prettier.io/docs/)
- [Typescript-ESLint](https://typescript-eslint.io/getting-started/)


## Installation


```bash
  npm i -D eslint @eslint/js @kornsupadej/pest-control-factory
```
    
## API Reference

*Formulate pesticide(s) suitable for your project.*

```js
  formulatePesticide({...options})
```
#### Options

| Parameter      | Type              | Description                  |
| :------------- | :---------------- | :--------------------------- |
| `linter`       | `LinterConfig<T>` | **Main Linter**              |
| `styleLinter`  | `LinterConfig<T>` | **Stylistic Linter**         |
| `testLinter`   | `LinterConfig<T>` | **Test Framework Linter**    |

#### LinterConfig
| Parameter      | Type              | Description                                 |
| :------------- | :---------------- | :------------------------------------------ |
| `type`         | `LinterType`      | **Type of tool using in the project**       |
| `options`      | `ConfigOptions`   | **ESLint Linter.Config**                    |

**NOTE:** See more [@ESLint](https://eslint.org/docs/latest/use/configure/configuration-files)



## Usage Example

*If you want to use the out of the box settings on each of the tools, just provide the types without any options as shown below:*

```js
  /** eslint.config.js */
  import { formulatePesticide } from '@kornsupadej/pest-control-factory'

  /** @type {import('eslint').Linter.Config[]} */
  export default formulatePesticide({
    // Specify framework used in the project
    linter: {
      type: 'nodejs'
    },
    // Specify tool used for code styling & convention
    styleLinter: {
      type: 'prettier'
    },
    // Specify testing framework used in the project
    testLinter: {
      type: 'jest'
    },
    typescript: false
  })
```

**NOTE:** There might be peer dependencies required by each configuration type, as above are:
- [eslint-plugin-n](https://www.npmjs.com/package/eslint-plugin-n)
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
- [eslint-plugin-import-x](https://www.npmjs.com/package/eslint-plugin-import-x)
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)


## Peer Dependencies Reference

| Type | Peer dependencies| Typescript |
| :-   | :- | :- |
| `Node.js` |[eslint-plugin-n](https://www.npmjs.com/package/eslint-plugin-n)|[typescript-eslint](https://www.npmjs.com/package/typescript-eslint)|
|`ESLint`|[eslint-plugin-import-x](https://www.npmjs.com/package/eslint-plugin-import-x)|[eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript)|
|`Prettier`|[eslint-plugin-import-x](https://www.npmjs.com/package/eslint-plugin-import-x), [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier), [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)|[eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript)|
|`Jest`|[eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)| - |
|`Vitest`|[@vitest/eslint-plugin](https://github.com/vitest-dev/eslint-plugin-vitest)| - |