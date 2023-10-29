import { IpcMainEvent } from "electron";
import { ConvertImageEvent } from "../events";
import { convertToIcon } from "./convert-to-icon";

export function onConvertImageEvent(event: IpcMainEvent, type: ConvertImageEvent) {
  convertToIcon(type.payload.filePath, type.payload.filePath).then((iconPath) => {
    event.reply("image-to-icon", {
      event: "convert-image",
      payload: {
        iconPath
      }
    });
  });
}
