import { ImageFileSelectedReplyEvent } from "@shared/ipc/events/image-to-icon/renderer-events";
import { pickFile } from "@shared/ipc/main/file-picker-dialog";
import { IpcMainEvent } from "electron";
import sharp from "sharp";

export const onSelectFileEvent = async (event: IpcMainEvent) => {
  const imagePath = pickFile({
    dialogTitle: "Select an image",
    dialogAction: {
      type: "openFile",
      label: "Select Image"
    },
    fileExtensionPreset: "Images",
    fileExtensionFilter: ["jpg", "jpeg", "png", "gif", "svg"]
  });

  if (imagePath == null) {
    event.reply("image-to-icon", {
      event: "convert-image",
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
    event.reply<ImageFileSelectedReplyEvent>("image-to-icon", {
      event: "file-selected",
      payload: {
        error: {
          message: "Image dimensions must be equal."
        }
      }
    });
    return;
  }

  event.reply<ImageFileSelectedReplyEvent>("image-to-icon", {
    event: "file-selected",
    payload: {
      filePath: imagePath
    }
  });
};
