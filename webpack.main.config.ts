import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import { plugins, resolve } from "./webpack.plugins";
import { merge } from "webpack-merge";
import { commonConfig } from "./webpack.common.config";

export const mainConfig: Configuration = merge(commonConfig, {
  entry: "./src/main/index.ts",
  output: {
    clean: true
  },
  module: {
    rules
  },
  plugins,
  resolve: resolve(".js", ".ts", ".jsx", ".tsx", ".css", ".json")
});
