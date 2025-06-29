import { IconSmithChannel } from "@shared/ipc/channels";
import { FileSelectedReplyEvent } from "@shared/ipc/events/common-events";
import { ConvertImageToIconActionEvent } from "@shared/ipc/events/image-to-icon/main-events";
import { pickFile } from "@shared/ipc/main/file-picker-dialog";
import { IpcMainEvent } from "electron";
import sharp from "sharp";

export const onSelectFileEvent = async (event: IpcMainEvent) => {
  const imagePath = pickFile({
    dialogTitle: "Select an image",
    fileExtensionPreset: "Images",
    fileExtensionFilter: ["jpg", "jpeg", "png", "gif", "svg"]
  });

  if (imagePath == null) {
    event.reply<ConvertImageToIconActionEvent>("iconsmith", {
      event: "convert-image-to-icon",
      payload: {
        error: {
          message: "No file selected."
        }
      }
    });
    return;
  }

  // Check if the image dimensions are valid
  const image = sharp(imagePath);
  const imageMetadata = await image.metadata();

  if (imageMetadata.width !== imageMetadata.height) {
    event.reply<FileSelectedReplyEvent<IconSmithChannel>>("iconsmith", {
      event: "file-selected",
      payload: {
        error: {
          message: "Image dimensions must be equal."
        }
      }
    });
    return;
  }

  event.reply<FileSelectedReplyEvent<IconSmithChannel>>("iconsmith", {
    event: "file-selected",
    payload: {
      filePath: imagePath
    }
  });
};
