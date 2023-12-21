import { IpcMainEvent } from "electron";
import { convertPDF } from "pdf2image";

export function onConvertPdfEvent(event: IpcMainEvent, pdfFilePath: string) {
  convertPDF(pdfFilePath, { density: 100, quality: 100 })
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
    });
}
