import fs from "fs";
import path from "path";
import { BrowserWindow, app, dialog } from "electron";

export interface ChooseFileOptions {
  dialogTitle: string;
  dialogAction: {
    type: "saveFile" | "openFile" | "openDirectory";
    label: string;
  };
  fileExtensionPreset: string;
  fileExtensionFilter?: string[];
}

export function chooseFile(options: ChooseFileOptions) {
  let property = null;

  switch (options.dialogAction.type) {
    case "openFile":
      property = "openFile";
      break;
    case "openDirectory":
      property = "openDirectory";
      break;
    default:
      return;
  }

  const selectedFiles = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
    filters: [{ name: options.fileExtensionPreset, extensions: options.fileExtensionFilter ?? [] }],
    properties: [property],
    buttonLabel: options.dialogAction.label,
    defaultPath: app.getPath("desktop"),
    title: options.dialogTitle
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

export interface SaveFileOptions {
  dialogTitle: string;
  dialogAction: {
    label: string;
  };
  fileName?: string;
  fileExtensionFilter?: {
    name: string;
    extensions: string[];
  };
}

export function saveFile(options: SaveFileOptions) {
  const selectedFile = dialog.showSaveDialogSync(BrowserWindow.getFocusedWindow(), {
    buttonLabel: options.dialogAction.label,
    properties: ["showOverwriteConfirmation"],
    defaultPath: path.join(app.getPath("desktop"), options.fileName ?? ""),
    title: options.dialogTitle,
    filters: [options.fileExtensionFilter]
  });

  if (selectedFile == null) {
    return;
  }

  return selectedFile;
}
