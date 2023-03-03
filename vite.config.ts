import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/styles/index.scss';`,
      },
    },
    modules:{},
    postcss:{}
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    proxy: {
      '^/api': {
        target: 'http://cloud.dev.aossci.com',
        changeOrigin: true,
      },
    },
  },
  build: {
    emptyOutDir: true, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
  },
});
