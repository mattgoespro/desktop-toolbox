import path from "path";
import webpackPaths from "../webpack/paths";
import { cleanDirectories } from "./clean";

export function removeBuilds() {
  cleanDirectories([
    path.resolve(webpackPaths.buildPath),
    path.resolve(webpackPaths.distPath),
    path.resolve(webpackPaths.dllPath)
  ]);
}

removeBuilds();
