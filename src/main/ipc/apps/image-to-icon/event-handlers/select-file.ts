import { IpcMainEvent } from "electron";
import { chooseFile } from "../../../shared/file-chooser";

export const onSelectFileEvent = (event: IpcMainEvent) => {
  const imagePath = chooseFile({
    title: "Select an image",
    name: "Images",
    extensions: ["jpg", "jpeg", "png", "gif", "svg"]
  });

  event.reply("image-to-icon", {
    event: "file-selected",
    payload: {
      filePath: imagePath
    }
  });
};
