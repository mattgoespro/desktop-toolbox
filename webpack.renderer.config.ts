import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import { plugins, resolve } from "./webpack.plugins";

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }]
});

export const rendererConfig: Configuration = {
  output: {
    clean: true
  },
  module: {
    rules
  },
  plugins,
  resolve: resolve(".js", ".ts", ".jsx", ".tsx", ".css")
};
