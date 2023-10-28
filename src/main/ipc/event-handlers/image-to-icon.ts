import fs from "fs";
import path from "path";
import url from "url";
import { IpcMainEvent, IpcMain, dialog, BrowserWindow, app } from "electron";
import { ImageToIconEventType } from "../events/image-to-icon";

const TEMP_UPLOADS_PATH = path.join(app.getPath("temp"), "image-to-icon", "uploads");

export const ImageToIconListenerFn = async (event: IpcMainEvent, type: ImageToIconEventType) => {
  switch (type.event) {
    case "select-file":
      return onSelectFileEvent(event);
    default:
      return;
  }
};

export const onSelectFileEvent = (event: IpcMainEvent) => {
  const selectedImages = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
    filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }],
    properties: ["openFile"]
  });

  if (selectedImages == null || selectedImages.length === 0) {
    return;
  }

  const filePath = selectedImages[0];
  const fileName = path.basename(filePath);

  if (!fs.existsSync(TEMP_UPLOADS_PATH)) {
    fs.mkdirSync(TEMP_UPLOADS_PATH, { recursive: true });
  }

  const targetPath = path.join(TEMP_UPLOADS_PATH, fileName);

  fs.copyFileSync(filePath, targetPath);

  event.reply("image-to-icon", {
    event: "file-selected",
    payload: {
      filePath: targetPath
    }
  });
};

export const imageToIconHandler = (ipcMain: IpcMain) => {
  ipcMain.on("image-to-icon", ImageToIconListenerFn);
};
