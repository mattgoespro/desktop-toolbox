import fs from "fs";
import { rimrafSync } from "rimraf";

export function cleanDirectories(directories: string[]) {
  directories.forEach((folder) => {
    if (fs.existsSync(folder)) {
      const removeFolder = rimrafSync(folder);

      if (!removeFolder) {
        throw new Error(`remove ${folder}: failed`);
      }

      console.log(`cleaned: ${folder}`);
      return;
    }

    console.log(`folder already cleaned: ${folder}`);
  });
}
