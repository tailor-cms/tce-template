import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'Display',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    minify: false,
    cssCodeSplit: false,
  },
  plugins: [vue()],
});
