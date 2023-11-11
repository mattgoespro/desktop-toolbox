import fs from "fs";
import path from "path";
import { rimrafSync } from "rimraf";
import webpackPaths from "../webpack/paths";

export function removeBuilds() {
  [
    path.resolve(webpackPaths.distPath),
    path.resolve(webpackPaths.buildPath),
    path.resolve(webpackPaths.dllPath)
  ].forEach((folder) => {
    if (fs.existsSync(folder)) {
      const removed = rimrafSync(folder);

      if (!removed) {
        throw new Error(`Failed to remove ${folder}`);
      }
    }
  });
}

(() => {
  removeBuilds();
})();
