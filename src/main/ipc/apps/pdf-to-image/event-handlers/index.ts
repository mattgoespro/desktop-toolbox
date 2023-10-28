import { IpcMain, IpcMainEvent } from "electron";
import { ImageToIconEventType } from "../../image-to-icon/events";
import { onSelectFileEvent } from "./select-file";

export const PdfToImageListenerFn = async (event: IpcMainEvent, type: ImageToIconEventType) => {
  switch (type.event) {
    case "select-file":
      return onSelectFileEvent(event);
    default:
      return;
  }
};

export const pdfToImageEventHandler = (ipcMain: IpcMain) => {
  ipcMain.on("image-to-icon", PdfToImageListenerFn);
};
