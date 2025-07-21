import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [tsConfigPaths(), tanstackStart(), tanstackStart({ target: 'netlify' })],
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    devSourcemap: true
  },
  // Optimera för bilder och QueryClient
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
