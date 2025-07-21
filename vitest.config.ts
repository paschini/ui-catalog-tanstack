import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-utils/setup.ts'],
    css: {
      include: /.+/,
      modules: {
        classNameStrategy: 'scoped'
      }
    },
    exclude: ['node_modules', 'dist', '.git', '.cache'],
    reporters: ['verbose'],
    coverage: { enabled: true }
  },
  // ✅ Säkerställ att CSS importeras korrekt
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
