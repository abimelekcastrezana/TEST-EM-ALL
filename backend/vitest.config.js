// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text'],
    },
    include: ['**/*.{e2e,test}.?(c|m)[jt]s?(x)'],
    poolOptions: {
      threads: {
        singleThread: true
      }
    }
  },
})
