
# :no_entry_sign: :bug: pest-control-factory

![node](https://badgen.net/badge/node.js/v18.x/green/) ![npm](https://badgen.net/badge/eslint/v9.x) ![typescript](https://badgen.net/badge/typescript/v5.x)

:toolbox: A toolbox to minimize bug infestation in projects with your favorite tools!

Powered by:

- [ESLint](https://eslint.org/docs/latest/)
- [Prettier](https://prettier.io/docs/)
- [Typescript-ESLint](https://typescript-eslint.io/getting-started/)


## :gear: Installation


```bash
  npm i -D @kornsupadej/pest-control-factory
```
    
## :open_book: API Reference

*Formulate pesticide(s) suitable for your project.*

```js
  formulatePesticide({...options})
```
#### Options

| Parameter      | Type              | Description                  |
| :------------- | :---------------- | :--------------------------- |
| `linter`       | `LinterConfig<T>` | **Primary Linter**           |
| `styleLinter`  | `LinterConfig<T>` | **Stylistic Linter**         |
| `testLinter`   | `LinterConfig<T>` | **Test Framework Linter**    |
| `typescript`   | `boolean`         | **TypeScript Project ?**     |

#### LinterConfig
| Parameter      | Type              | Description                                 |
| :------------- | :---------------- | :------------------------------------------ |
| `type`         | `LinterType`      | **Type of tool using in the project**       |
| `options`      | `ConfigOptions`   | **ESLint Linter.Config**                    |

**NOTE:** See more [@ESLint](https://eslint.org/docs/latest/use/configure/)



## :scroll: Usage Example

*If you want to use the out of the box settings on each of the tools, just provide the types without any options as shown below:*

Create a [ESLint Config File](https://eslint.org/docs/latest/use/configure/configuration-files) file in your project root directory.

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
*Or you can provide more options to each linter as below:*
```js
  /** eslint.config.js */
  import { formulatePesticide } from '@kornsupadej/pest-control-factory'

  /** @type {import('eslint').Linter.Config[]} */
  export default formulatePesticide({
    // Specify framework used in the project
    linter: {
      type: 'nodejs'
      options: {
          // ignore 'file-to-ignore.js' if found in any dir
          ignores: ['**/file-to-ignore.js']
          // customize @eslint/js rules
          rules: {
              "no-unused-vars": "error"
          }
      }
    },
    // Specify tool used for code styling & convention
    styleLinter: {
      // using default settings
      type: 'prettier'
    },
    // Specify testing framework used in the project
    testLinter: {
      type: 'jest',
      // customize jest rules
      rules: {
          "jest/expect-expect": "error"
      }
    },
    typescript: false
  })
```


## :books: Dependencies Reference

| Type | Peer dependencies| Typescript | Ext. plugins support
| :-   | :- | :- | :- |
| `Node.js` |[eslint-plugin-n](https://www.npmjs.com/package/eslint-plugin-n)|[typescript-eslint](https://www.npmjs.com/package/typescript-eslint)| :white_check_mark:|
|`ESLint`|[eslint-plugin-import-x](https://www.npmjs.com/package/eslint-plugin-import-x)|[eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript)|:white_check_mark:|
|`Prettier`|[eslint-plugin-import-x](https://www.npmjs.com/package/eslint-plugin-import-x), [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier), [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier)|[eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript)|:white_check_mark:|
|`Jest`|[eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)| - |:x:|
|`Vitest`|[@vitest/eslint-plugin](https://github.com/vitest-dev/eslint-plugin-vitest)| - |:x:|


## :rainbow: Roadmap

- Additional Frameworks Support
    - VanillaJS (CJS & ESM)
    - React
    - NextJS
    - Angular
    - Vue