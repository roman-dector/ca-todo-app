import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [svgr(), react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./config/test/setup-files.ts", // relative to repo root
  },
})
