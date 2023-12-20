import { IpcMainEvent } from "electron";
import sharp from "sharp";
import { pickFile } from "../../shared/file-picker-dialog";

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

  if (!imagePath) {
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

  // check if the image dimensions are valid
  const image = sharp(imagePath);
  const imageMetadata = await image.metadata();

  if (imageMetadata.width !== imageMetadata.height) {
    event.reply("image-to-icon", {
      event: "convert-image",
      payload: {
        error: {
          message: "Image dimensions must be equal."
        }
      }
    });
    return;
  }

  event.reply("image-to-icon", {
    event: "file-selected",
    payload: {
      filePath: imagePath
    }
  });
};
