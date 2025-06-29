import { IpcMain, IpcMainEvent } from "electron";
import { onConvertImageEvent } from "./convert-image";
import { onSelectFileEvent } from "./select-file";
import { IconSmithEvents } from "@shared/ipc/events";

function handleIconSmithActionEvents(ipcEvent: IpcMainEvent, toolEvent: IconSmithEvents) {
  console.log("Handling IconSmith action event: ", toolEvent);

  switch (toolEvent.event) {
    case "select-file":
      onSelectFileEvent(ipcEvent);
      return;
    case "convert-image-to-icon":
      onConvertImageEvent(ipcEvent, toolEvent);
      return;
    default:
      throw new Error(`Unable to handle unknown IconSmith event type: ${toolEvent.event}`);
  }
}

export const iconSmithEventHandler = (ipcMain: IpcMain) => {
  ipcMain.on("iconsmith", handleIconSmithActionEvents);
};
