/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Portfoilo/",
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
  build: {
    // Optimize build output
    minify: "esbuild",
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: undefined, // Single bundle for small app
      },
    },
  },
});
