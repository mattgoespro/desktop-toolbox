import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import { plugins, resolve } from "./webpack.plugins";
import { merge } from "webpack-merge";
import { commonConfig } from "./webpack.common.config";

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }]
});

export const rendererConfig: Configuration = merge(commonConfig, {
  target: "electron-renderer",
  module: {
    rules
  },
  plugins,
  resolve: resolve(".js", ".ts", ".jsx", ".tsx", ".css")
});
