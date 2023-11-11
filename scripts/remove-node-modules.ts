import fs from "fs";
import path from "path";
import { rimrafSync } from "rimraf";
import webpackPaths from "../webpack/paths";

function removeNodeModules() {
  [
    path.resolve(webpackPaths.rootPath, "node_modules"),
    path.resolve(webpackPaths.releasePath, "node_modules")
  ].forEach((folder) => {
    if (fs.existsSync(folder)) {
      const removed = rimrafSync(folder);

      if (!removed) {
        throw new Error(`Failed to remove ${folder}`);
      }
    } else {
      console.log(`No ${folder} to remove`);
    }
  });
}

() => {
  removeNodeModules();
};
