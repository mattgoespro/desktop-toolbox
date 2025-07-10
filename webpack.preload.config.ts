import type { Configuration } from "webpack";
import { plugins, resolve } from "./webpack.plugins";
import { merge } from "webpack-merge";
import { commonConfig } from "./webpack.common.config";
import path from "path";

export const preloadConfig: Configuration = merge(commonConfig, {
  entry: "./src/shared/framework/preload.ts",
  target: "electron-preload",
  output: {
    path: path.resolve(__dirname, ".webpack"),
    filename: "preload.js"
  },
  plugins,
  resolve: resolve(".ts")
});
