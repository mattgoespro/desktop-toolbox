import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import { plugins, resolve } from "./webpack.plugins";
import { commonConfig } from "./webpack.common.config";
import path from "path";

// export const rendererConfig = merge<Configuration>(commonConfig, {
//   entry: ["./src/renderer/index.tsx", "./src/renderer/preload.ts"],
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [{ loader: "style-loader" }, { loader: "css-loader" }]
//       }
//     ]
//   },
//   plugins,
//   resolve: resolve(".js", ".ts", ".jsx", ".tsx", ".css")
// });
export const rendererConfig = {
  entry: ["./src/renderer/index.tsx", "./src/renderer/preload.ts"],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins,
  resolve: resolve(".js", ".ts", ".jsx", ".tsx", ".css")
};
