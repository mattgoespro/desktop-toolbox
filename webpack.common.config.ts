import { Configuration } from "webpack";

export const commonConfig: Configuration = {
  devtool: process.env.NODE_ENV === "development" ? "source-map" : false,
  output: {
    clean: true
  },
  module: {
    rules: [
      {
        /**
         * Specifying native_modules in the test because the asset relocator loader generates a
         * "fake" .node file
         */
        test: /native_modules[/\\].+\.node$/,
        use: "node-loader"
      },
      {
        test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: "@vercel/webpack-asset-relocator-loader",
          options: {
            outputAssetBase: "native_modules"
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  cache: {
    type: "filesystem"
  }
};
