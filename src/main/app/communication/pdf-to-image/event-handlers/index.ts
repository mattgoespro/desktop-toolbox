import { IpcMain, IpcMainEvent } from "electron";
import { RendererPdfToImageEvents } from "renderer/App/Communication/pdf-to-image/events";
import { onSelectFileEvent } from "./select-file";

const PdfToImageListenerFn = async (event: IpcMainEvent, type: RendererPdfToImageEvents) => {
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
