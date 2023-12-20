import { IpcMainEvent } from "electron";
import { pickFile } from "../../shared/file-picker-dialog";

export const onSelectFileEvent = (event: IpcMainEvent) => {
  const pdfPath = pickFile({
    dialogTitle: "Select a PDF",
    dialogAction: {
      type: "openFile",
      label: "Select PDF"
    },
    fileExtensionPreset: "PDF",
    fileExtensionFilter: ["pdf"]
  });

  event.reply("pdf-to-image", {
    event: "file-selected",
    payload: {
      filePath: pdfPath
    }
  });
};
