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
    chunkSizeWarningLimit: 1000, // Increase limit to 1MB (Three.js is inherently large)
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          // Split Three.js and related libraries into separate chunks
          if (id.indexOf("node_modules") !== -1) {
            if (id.indexOf("three") !== -1 || id.indexOf("@react-three") !== -1) {
              return "three";
            }
            if (id.indexOf("gsap") !== -1) {
              return "gsap";
            }
            // Other node_modules go into vendor chunk
            return "vendor";
          }
        },
      },
    },
  },
});
