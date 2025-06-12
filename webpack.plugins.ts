import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsConfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";
import { DefinePlugin } from "webpack";

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
    async: true
  }),
  new DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
  })
];

export function resolve(...extensions: string[]) {
  return {
    extensions,
    plugins: [new TsConfigPathsWebpackPlugin()]
  };
}
