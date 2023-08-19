import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import {resolve} from 'node:path'

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    environment: "jsdom",
  },
   root: ".", //Define the root,
   resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
   }
});