import fs from "fs";
import { BrowserWindow, dialog } from "electron";

interface ChooseFileOptions {
  dialogTitle: string;
  fileExtensionPreset: string;
  fileExtensionFilter?: string[];
}

export function chooseFile(options: ChooseFileOptions) {
  const selectedFiles = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
    filters: [{ name: options.fileExtensionPreset, extensions: options.fileExtensionFilter ?? [] }],
    properties: ["openFile"],
    title: options.dialogTitle ?? "Choose a file"
  });

  if (selectedFiles == null || selectedFiles.length === 0) {
    return;
  }

  // check if the file exists
  if (!fs.existsSync(selectedFiles[0])) {
    throw new Error(`File does not exist. Was it deleted?`);
  }

  return selectedFiles[0];
}
