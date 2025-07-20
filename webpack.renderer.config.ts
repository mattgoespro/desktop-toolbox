import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import { plugins, resolve } from "./webpack.plugins";
import { commonConfig } from "./webpack.common.config";

export const rendererConfig = merge<Configuration>(commonConfig, {
  output: {
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins,
  resolve: resolve(".js", ".ts", ".jsx", ".tsx", ".css")
});
