import { IpcMainEvent, IpcMain, dialog, BrowserWindow } from "electron";
import { ImageToIconEventType } from "../events/image-to-icon";

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

  event.reply("image-to-icon", {
    event: "file-selected",
    payload: filePath
  });
};

export const imageToIconHandler = (ipcMain: IpcMain) => {
  ipcMain.on("image-to-icon", ImageToIconListenerFn);
};
