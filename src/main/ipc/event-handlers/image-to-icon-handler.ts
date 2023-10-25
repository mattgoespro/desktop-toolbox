import { IpcMainEvent, ipcMain } from "electron";

export const ImageToIconListener = async (event: IpcMainEvent, payload) => {
  console.log("convert-image-to-icon event received", event, payload);
};
