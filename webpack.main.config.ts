import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import { plugins, resolve } from "./webpack.plugins";

export const mainConfig: Configuration = {
  entry: "./src/main/index.ts",
  output: {
    clean: true
  },
  module: {
    rules
  },
  plugins,
  resolve: resolve(".js", ".ts", ".jsx", ".tsx", ".css", ".json")
};
