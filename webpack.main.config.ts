import type { Configuration } from "webpack";
import { inDevMode, plugins, resolve } from "./webpack.plugins";
import { commonConfig } from "./webpack.common.config";

export const mainConfig: Configuration = {
  ...commonConfig,
  entry: "./src/main/index.ts",
  devtool: inDevMode() ? "source-map" : false,
  plugins,
  resolve: resolve(".js", ".ts", ".jsx", ".tsx", ".css", ".json"),
  externals: {
    sharp: "commonjs2 sharp",
    "@img/sharp-win32-x64": "commonjs2 @img/sharp-win32-x64"
  }
};
