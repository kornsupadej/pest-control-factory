import eslintPluginNode from 'eslint-plugin-n'

export const ESMFixture = [
  {
    name: 'pest-control/esm',
    files: ['**/*.js'],
    plugins: { n: eslintPluginNode },
    rules: {
      ...eslintPluginNode.configs['flat/recommended-module'].rules,
      'n/callback-return': ['error', ['cb', 'callback', 'next']],
      'n/handle-callback-err': ['error', 'err'],
      'n/prefer-node-protocol': 'error',
    },
  },
]
