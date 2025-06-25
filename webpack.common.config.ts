import { Configuration } from "webpack";

const mode = process.env.NODE_ENV ?? "production";

export const commonConfig: Configuration = {
  output: {
    clean: mode === "production"
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
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        exclude: /(node_modules|\.webpack)/,
        options: {
          loader: "tsx",
          target: "es2020"
        }
      }
    ]
  },
  cache: {
    type: "filesystem"
  }
};
