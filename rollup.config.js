import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "iife",
    sourcemap: true,
  },
  plugins: [typescript()],
};
