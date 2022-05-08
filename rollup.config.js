import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

const plugins = [typescript(), babel({ babelHelpers: "inline" })];

export default [
  {
    input: ["src/intercept-requests/loader.ts"],
    output: {
      name: "interceptRequests",
      file: "dist/intercept-requests.js",
      sourcemap: true,
    },
    plugins,
  },
  {
    input: ["src/inspect-slots/index.ts"],
    output: {
      name: "inspectSlots",
      file: "dist/inspect-slots.js",
      format: "iife",
      sourcemap: true,
    },
    plugins,
  },
];
