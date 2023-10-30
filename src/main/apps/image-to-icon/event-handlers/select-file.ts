import { IpcMainEvent } from "electron";
import { chooseFile } from "../../../shared/file-picker-dialog";

export const onSelectFileEvent = (event: IpcMainEvent) => {
  const imagePath = chooseFile({
    dialogTitle: "Select an image",
    fileExtensionPreset: "Images",
    fileExtensionFilter: ["jpg", "jpeg", "png", "gif", "svg"]
  });

  event.reply("image-to-icon", {
    event: "file-selected",
    payload: {
      filePath: imagePath
    }
  });
};
