import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: '@kornsupadej/pest-control-factory',
    environment: 'node',
    include: ['tests/**/*.test.js'],
    mockReset: true,
    restoreMocks: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text'],
    },
  },
})
