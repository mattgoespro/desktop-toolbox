import { IpcMainEvent } from "electron";
import { onConvertImageEvent } from "./convert-image";
import { onSelectFileEvent } from "./select-file";
import { ImageToIconEvents } from "@shared/ipc/events";

const ImageToIconListenerFn = async (event: IpcMainEvent, type: ImageToIconEvents) => {
  switch (type.event) {
    case "select-file":
      console.log("Handling select file event in image-to-icon");
      onSelectFileEvent(event);
      return;
    case "convert-image":
      console.log("Handling convert image event in image-to-icon");
      onConvertImageEvent(event, type);
      return;
    default:
      return;
  }
};

export const imageToIconEventHandler = (ipcMain: Electron.CrossProcessExports.IpcMain) => {
  console.log("Attaching image to icon event handler");
  ipcMain.on("image-to-icon", ImageToIconListenerFn);
};
