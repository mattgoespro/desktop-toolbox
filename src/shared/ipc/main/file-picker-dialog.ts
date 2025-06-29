import fs from "fs";
import path from "path";
import { BrowserWindow, app, dialog } from "electron";

export interface PickFileOptions {
  dialogTitle: string;
  fileExtensionPreset: string;
  fileExtensionFilter?: string[];
}

export function pickFile({
  dialogTitle,
  fileExtensionPreset,
  fileExtensionFilter
}: PickFileOptions) {
  const selectedFiles = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
    title: dialogTitle,
    properties: ["openFile"],
    buttonLabel: "Select File",
    defaultPath: app.getPath("desktop"),
    filters: [{ name: fileExtensionPreset, extensions: fileExtensionFilter ?? [] }]
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
  defaultSaveFileName?: string;
}

export function selectFileDestination({
  dialogTitle,
  dialogAction,
  defaultSaveFileName
}: SaveFileOptions) {
  const fileDestination = dialog.showSaveDialogSync(BrowserWindow.getFocusedWindow(), {
    buttonLabel: dialogAction.label,
    properties: ["showOverwriteConfirmation"],
    message: "Select the file destination directory",
    defaultPath: defaultSaveFileName ?? path.join(app.getPath("desktop"), "icon.ico"),
    title: dialogTitle
  });

  return fileDestination;
}
