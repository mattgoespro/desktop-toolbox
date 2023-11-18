import path from "path";
import webpackPaths from "../webpack/paths";
import { cleanDirectories } from "./clean";

export function removeNodeModules() {
  cleanDirectories([
    path.resolve(webpackPaths.rootNodeModulesPath),
    path.resolve(webpackPaths.releaseAppNodeModulesPath),
    path.resolve(webpackPaths.srcNodeModulesPath)
  ]);
}

removeNodeModules();
