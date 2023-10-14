import { IpcMainEvent, ipcMain } from "electron";
import { convertPDF } from "pdf2image";

export const PdfToImageListener = ipcMain.on(
  "pdf-to-image",
  async (event: IpcMainEvent, payload) => {
    console.log("convert-pdf-to-image event received", event, payload);

    convertPDF(payload, { density: 100, quality: 100 })
      .then((images) => {
        event.reply("pdf-to-image", {
          type: "file-selected",
          payload: images
        });
      })
      .catch((error) => {
        event.reply("pdf-to-image", {
          type: "file-selected",
          error: new Error(error.message)
        });
      })
      .finally(() => {
        event.reply("pdf-to-image");
      });
  }
);
