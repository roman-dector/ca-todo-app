import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

import ts from "rollup-plugin-ts"
import { di } from "@wessberg/di-compiler"

// https://github.com/wessberg/DI-compiler
const diPlugin = (options = {}): Plugin => {
  return {
    ...ts({
      ...options,
      transformers: [di],
      transpileOnly: true,
      exclude: ["**/*.test.ts"],
      tsconfig: resolvedConfig => ({
        ...resolvedConfig,
        declaration: false,
      }),
    }),
    name: "vite:di",
    enforce: "pre",
  }
}

export default defineConfig({
  plugins: [svgr(), react(), tsconfigPaths(), diPlugin()],

  root: "./src/app",
  envDir: "../../",
  base: "./",

  build: {
    outDir: "../../dist",
    target: "esnext",
  },
})
