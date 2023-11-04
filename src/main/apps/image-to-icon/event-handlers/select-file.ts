import { IpcMainEvent } from "electron";
import sharp from "sharp";
import { chooseFile } from "../../../shared/file-picker-dialog";

export const onSelectFileEvent = async (event: IpcMainEvent) => {
  const imagePath = chooseFile({
    dialogTitle: "Select an image",
    dialogAction: {
      type: "openFile",
      label: "Select Image"
    },
    fileExtensionPreset: "Images",
    fileExtensionFilter: ["jpg", "jpeg", "png", "gif", "svg"]
  });

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
