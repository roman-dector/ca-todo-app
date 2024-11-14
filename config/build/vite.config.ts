import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

import { diPlugin } from "./diPlugin"

export default defineConfig({
  plugins: [svgr(), react(), tsconfigPaths(), diPlugin()],

  root: "src/app", // index.html directory
  envDir: "../../", // relative to "root"
  base: "./",

  build: {
    outDir: "../../dist", // relative to "root"
    target: "esnext",
  },
})
