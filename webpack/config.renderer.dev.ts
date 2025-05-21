import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {
  DllReferencePlugin,
  Configuration,
  NoEmitOnErrorsPlugin,
  LoaderOptionsPlugin,
  EnvironmentPlugin
} from "webpack";
import "webpack-dev-server";
import { merge } from "webpack-merge";
import baseConfig, { checkNodeEnv } from "./config.base";
import webpackPaths from "./paths";
import detectPort from "detect-port";

export async function checkPortUsage(port: number) {
  await new Promise((resolve, reject) =>
    detectPort(
      {
        hostname: "localhost",
        port: port
      },
      (error, port) => {
        if (error != null) {
          console.error("error: port is in use");
          reject(false);
          return;
        }

        console.log(`port ${port} is available`);

        resolve(true);
      }
    )
  );
}

if (process.env.NODE_ENV === "production") {
  checkNodeEnv("development");
}

const devServerPort = 1212;

checkPortUsage(devServerPort);

const manifest = path.resolve(webpackPaths.dllPath, "renderer.json");
const skipDLLs =
  module.parent?.filename.includes("config.renderer.dev.dll") ||
  module.parent?.filename.includes("webpack.config.renderer.dev");

/**
 * Warn if the DLLs aren't built
 */
if (!skipDLLs && !(fs.existsSync(webpackPaths.dllPath) && fs.existsSync(manifest))) {
  console.warn('Building missing DLL files..."');
  execSync("npm run postinstall");
}

const configuration: Configuration = {
  devtool: "inline-source-map",
  mode: "development",
  target: ["web", "electron-renderer"],
  entry: [
    `webpack-dev-server/client?http://localhost:${devServerPort}/dist`,
    "webpack/hot/only-dev-server",
    path.join(webpackPaths.srcRendererPath, "index.tsx")
  ],
  output: {
    path: webpackPaths.distRendererPath,
    publicPath: "/",
    filename: "renderer.dev.js",
    library: {
      type: "umd"
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "css-loader",
            options: { modules: true, sourceMap: true, importLoaders: 1 }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource"
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }]
              },
              titleProp: true,
              ref: true
            }
          },
          "file-loader"
        ]
      }
    ]
  },
  plugins: [
    ...(skipDLLs
      ? []
      : [
          new DllReferencePlugin({
            context: webpackPaths.dllPath,
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            manifest: require(manifest),
            sourceType: "var"
          })
        ]),
    new ReactRefreshWebpackPlugin({
      include: [webpackPaths.srcRendererPath],
      forceEnable: true
    }),
    new NoEmitOnErrorsPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: "development"
    }),
    new LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      filename: path.join("index.html"),
      template: path.join(webpackPaths.srcRendererPath, "index.ejs"),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      isBrowser: false,
      env: process.env.NODE_ENV,
      isDevelopment: process.env.NODE_ENV !== "production",
      nodeModules: webpackPaths.releaseAppNodeModulesPath
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  },
  devServer: {
    port: devServerPort,
    compress: true,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    static: {
      publicPath: "/"
    },
    historyApiFallback: {
      verbose: true
    }
  }
};

export default merge(baseConfig, configuration);
