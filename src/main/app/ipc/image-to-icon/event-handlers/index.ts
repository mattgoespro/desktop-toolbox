import { IpcMainEvent } from "electron";
import { onConvertImageEvent } from "./convert-image";
import { onSelectFileEvent } from "./select-file";
import { ImageToIconEvents } from "@shared/ipc/events";

const ImageToIconListenerFn = async (event: IpcMainEvent, type: ImageToIconEvents) => {
  switch (type.event) {
    case "select-file":
      onSelectFileEvent(event);
      return;
    case "convert-image":
      onConvertImageEvent(event, type);
      return;
    default:
      return;
  }
};

export const imageToIconEventHandler = (ipcMain: Electron.CrossProcessExports.IpcMain) => {
  ipcMain.on("image-to-icon", ImageToIconListenerFn);
};
