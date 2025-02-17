import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: '@kornsupadej/pest-control-factory',
    environment: 'node',
    coverage: {
      provider: 'istanbul',
      reporter: ['text'],
    },
  },
})
