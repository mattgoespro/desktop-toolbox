import { commonConfig } from "./webpack.common.config";
import { plugins, resolve } from "./webpack.plugins";

export const rendererConfig = {
  ...commonConfig,
  entry: ["./src/renderer/index.tsx", "./src/renderer/preload.ts"],
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.ts[x]$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins,
  resolve: resolve(".js", ".ts", ".jsx", ".tsx", ".css")
};
