import fs from "fs-extra";
import path from "path";
import sharp from "sharp";
import { ConvertImageToIconActionEvent } from "@shared/ipc/events/image-to-icon/main-events";
import { selectFileDestination } from "@shared/ipc/main/file-picker-dialog";
import { ImageConvertedReplyEvent } from "@shared/ipc/events/image-to-icon/renderer-events";
import { IpcMainEvent } from "electron";

export async function onConvertImageEvent(
  main: IpcMainEvent,
  event: ConvertImageToIconActionEvent
) {
  const { imageFilePath } = event.payload;

  // choose a directory to save the icon
  const iconPath = selectFileDestination({
    dialogTitle: "Save Icon",
    dialogAction: {
      label: "Save Icon"
    },
    defaultSaveFileName: `${path.basename(imageFilePath, path.extname(imageFilePath))}.ico`
  });

  console.log(`Selected icon path: ${iconPath}`);

  if (iconPath == null) {
    return;
  }

  let payload: ImageConvertedReplyEvent["payload"] = null;

  try {
    const iconData = await convertImageToIcon(imageFilePath);

    fs.writeFileSync(iconPath, iconData);
    console.log(`Converted image and generated icon -> ${iconPath}`);

    payload = {
      outputIconPath: iconPath
    };
  } catch (error) {
    console.error(error);
    payload = {
      error: {
        message: error.message
      }
    };
  }

  main.reply<ImageConvertedReplyEvent>("iconsmith", {
    event: "image-converted",
    payload
  });
}

async function convertImageToIcon(imagePath: string) {
  // Create an array of image sizes for the ICO file
  const imageSizes = [16, 32, 48, 64];

  // Create an array to store the ICO image data
  const icoImages: Buffer[] = [];

  // Process and convert the input image to ICO format for each size
  for (const size of imageSizes) {
    const buffer = await sharp(imagePath).resize(size, size).toBuffer();

    icoImages.push(buffer);
  }

  // Write the ICO file header
  const header = Buffer.from([
    0,
    0, // Reserved (must be 0)
    1,
    0, // Image type (1 for ICO)
    icoImages.length,
    0 // Number of images in the icon directory
  ]);

  // Calculate the ICO image data offset
  const dataOffset = header.length + 16 * icoImages.length;

  // Write the ICO icon directory
  const iconDirectory: Buffer[] = [];
  let imageDataOffset = dataOffset;
  for (let i = 0; i < icoImages.length; i++) {
    const image = icoImages[i];
    const imageHeader = Buffer.from([
      imageSizes[i], // Width
      imageSizes[i], // Height
      0, // Color depth (0 means the image uses as many colors as possible)
      0, // Reserved (must be 0)
      1,
      0, // Color planes (1)
      32,
      0, // Bits per pixel (32 for full color with alpha channel)
      image.length,
      0,
      0,
      0, // Image data size
      imageDataOffset,
      0,
      0,
      0 // Offset to image data
    ]);
    iconDirectory.push(imageHeader);
    imageDataOffset += image.length;
  }

  return Buffer.concat([header, ...iconDirectory, ...icoImages]);
}
