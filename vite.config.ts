import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [tsConfigPaths(), tanstackStart()],
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
    rollupOptions: {
      output: {
        manualChunks: {
          'react-query': ['@tanstack/react-query']
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
