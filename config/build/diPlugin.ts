import type { Plugin } from "vite"

import ts from "typescript"
import typescript from "@rollup/plugin-typescript"
import { di } from "@wessberg/di-compiler"

const diTransformersFactory = (program: ts.Program) => di({ program })

export const diPlugin = (): Plugin => ({
  ...typescript({
    transformers: diTransformersFactory,
    exclude: ["**/*.test.ts"],
    tsconfig: "tsconfig.json",
    sourceMap: false,
  }),
  name: "vite-wessberg-di",
  enforce: "pre",
})
