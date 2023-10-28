import { IpcMainEvent } from "electron";
import { chooseFile } from "../../../shared/file-chooser";

export const onSelectFileEvent = (event: IpcMainEvent) => {
  const pdfPath = chooseFile({
    title: "Select a PDF",
    name: "PDF",
    extensions: ["pdf"]
  });

  event.reply("pdf-to-image", {
    event: "file-selected",
    payload: {
      filePath: pdfPath
    }
  });
};
