import eslintPluginNode from 'eslint-plugin-n'

export const CJSFixture = [
  {
    name: 'pest-control/cjs',
    files: ['**/*.cjs'],
    plugins: { n: eslintPluginNode },
    rules: {
      ...eslintPluginNode.configs['flat/recommended-script'].rules,
      'n/callback-return': ['error', ['cb', 'callback', 'next']],
      'n/handle-callback-err': ['error', 'err'],
      'n/prefer-node-protocol': 'error',
      'n/no-mixed-requires': 'error',
      'n/no-new-require': 'error',
      'n/no-path-concat': 'error',
    },
  },
]
