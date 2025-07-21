import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [tsConfigPaths(), tanstackStart({ target: 'netlify' })],
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    devSourcemap: true
  },
  optimizeDeps: {
    include: ['@tanstack/react-query']
  },
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
