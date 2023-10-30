import { IpcMain, IpcMainEvent } from "electron";
import { PdfToImageEventType } from "../events";
import { onSelectFileEvent } from "./select-file";

const PdfToImageListenerFn = async (event: IpcMainEvent, type: PdfToImageEventType) => {
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
