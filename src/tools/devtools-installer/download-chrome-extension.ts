import fs from "fs-extra";
import path from "path";
import unzipper from "unzipper";
import { changePermissions, downloadFile, getPath } from "./utils";

export async function downloadChromeExtension(chromeStoreID: string, forceDownload = false) {
  const extensionsStore = getPath();
  const extensionFolder = path.join(extensionsStore, chromeStoreID);

  if (fs.existsSync(extensionFolder) && !forceDownload) {
    return extensionFolder;
  }

  fs.ensureDirSync(extensionsStore);

  if (fs.existsSync(extensionFolder) && forceDownload) {
    fs.rmdirSync(extensionFolder, {
      recursive: true
    });
  }

  const extensionUrl = `https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${chromeStoreID}%26uc&prodversion=${process.versions.chrome}`;
  const filePath = path.resolve(`${extensionFolder}.crx`);

  try {
    await downloadFile(extensionUrl, filePath);

    await unzipper.Extract({ path: extensionFolder }).promise();
    changePermissions(extensionFolder, 755);

    return extensionFolder;
  } catch (error) {
    console.error(error.message);

    fs.rmdirSync(extensionFolder, {
      recursive: true
    });
  }

  return extensionFolder;
}
