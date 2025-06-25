import type { Configuration } from "webpack";
import { plugins, resolve } from "./webpack.plugins";
import { merge } from "webpack-merge";
import { commonConfig } from "./webpack.common.config";

export const mainConfig: Configuration = merge(commonConfig, {
  entry: "./src/main/index.ts",
  plugins,
  resolve: resolve(".js", ".ts", ".jsx", ".tsx", ".css", ".json")
});
