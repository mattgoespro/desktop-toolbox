import { BrowserWindow, dialog } from "electron";

interface ChooseFileOptions {
  title: string;
  name: string;
  extensions?: string[];
}

export function chooseFile(options: ChooseFileOptions) {
  const selectedFiles = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
    filters: [{ name: options.name, extensions: options.extensions ?? [] }],
    properties: ["openFile"],
    title: options.title
  });

  if (selectedFiles == null || selectedFiles.length === 0) {
    return;
  }

  return selectedFiles[0];
}
