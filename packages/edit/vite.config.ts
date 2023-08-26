import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'Edit',
      fileName: 'index',
    },
  },
  plugins: [vue()],
});
