import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"
import di from "vite-wessberg-di"

export default defineConfig({
  plugins: [svgr(), react(), tsconfigPaths(), di()],

  root: "src/app", // index.html directory
  envDir: "../../", // relative to "root"
  base: "./",

  build: {
    outDir: "../../dist", // relative to "root"
    target: "esnext",
  },
})
