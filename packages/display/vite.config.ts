import { resolve } from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "Display",
      fileName: "index",
    },
  },
  plugins: [vue()],
});
