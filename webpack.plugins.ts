import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration } from "webpack";

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure"
  })
];

export function resolve(...extensions: string[]): Configuration["resolve"] {
  return {
    extensions,
    plugins: [new TsConfigPathsWebpackPlugin()],
    fallback: {
      path: false,
      fs: false
    }
  };
}
