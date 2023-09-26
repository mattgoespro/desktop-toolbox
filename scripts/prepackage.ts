import fs from "fs";
import { rimrafSync } from "rimraf";
import webpackPaths from "../webpack/paths";

const removeBuilds = () => {
  [webpackPaths.distPath, webpackPaths.buildPath, webpackPaths.dllPath].forEach((folder) => {
    if (fs.existsSync(folder)) {
      const removed = rimrafSync(folder);

      if (!removed) {
        throw new Error(`Failed to remove ${folder}`);
      }
    }
  });
};

() => {
  removeBuilds();
};
