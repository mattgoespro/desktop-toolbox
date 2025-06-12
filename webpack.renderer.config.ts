import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import { plugins, resolve } from "./webpack.plugins";
import HtmlWebpackPlugin from "html-webpack-plugin";

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }]
});

const isProd = process.env.NODE_ENV === "production";

export const rendererConfig: Configuration = {
  module: {
    rules
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: "./src/renderer/index.html",
      templateParameters: {
        cspMetaTag: isProd
          ? `<meta http-equiv="Content-Security-Policy" content="
              default-src 'self';
              style-src 'self' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              script-src 'self';
              connect-src 'self';
              img-src 'self' data:;
            ">`
          : ""
      }
    })
  ],
  resolve: resolve(".js", ".ts", ".jsx", ".tsx", ".css")
};
