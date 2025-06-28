import fs from "fs";
import path from "path";
import { IpcMainEvent, app } from "electron";
import sharp from "sharp";
import { ConvertImageActionEvent } from "@shared/ipc/events/main-events";
import { saveFile } from "@shared/ipc/main/file-picker-dialog";
import { ImageConvertedReplyEvent } from "@shared/ipc/events/image-to-icon/renderer-events";

function createTempFolders() {
  // get the path to the temp folder of the app
  const tempPath = app.getPath("temp");

  // create a folder for the app in the temp folder
  const appTempUploadsPath = path.join(tempPath, "Desktop Tools", "image-to-icon", "uploads");
  const appTempConvertedPath = path.join(tempPath, "Desktop Tools", "image-to-icon", "converted");
  const tempPaths = [appTempUploadsPath, appTempConvertedPath];

  tempPaths.forEach((tempPath) => {
    // create the folder if it doesn't exist
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath, { recursive: true });
    }
  });
}

function copyImageToTempFolder(filePath: string): string {
  // get the path to the temp folder of the app
  const tempPath = path.join(app.getPath("temp"), "Desktop Tools", "image-to-icon", "uploads");

  // copy the image to the temp folder
  const imageFileName = path.basename(filePath);
  const imageTempPath = path.join(tempPath, imageFileName);

  fs.copyFileSync(filePath, imageTempPath);

  return imageTempPath;
}

export async function onConvertImageEvent(event: IpcMainEvent, type: ConvertImageActionEvent) {
  createTempFolders();

  const tempFilePath = copyImageToTempFolder(type.payload.filePath);

  // choose a directory to save the icon
  const outputPath = saveFile({
    dialogTitle: "Save Icon",
    dialogAction: {
      label: "Save Icon"
    },
    fileName: `${path.basename(tempFilePath, path.extname(tempFilePath))}.ico`,
    fileExtensionFilter: {
      name: "Icon",
      extensions: ["ico"]
    }
  });

  if (outputPath == null) {
    return;
  }

  let payload: ImageConvertedReplyEvent["payload"] = null;

  try {
    const iconPath = await convertToICO(tempFilePath);

    if (fs.existsSync(iconPath)) {
      fs.writeFileSync(outputPath, iconPath);
      console.log(`Icon saved to ${outputPath}`);
    }

    payload = {
      outputIconPath: tempFilePath
    };
  } catch (error) {
    console.error(error);
    payload = {
      error: {
        message: error.message
      }
    };
  }

  event.reply<ImageConvertedReplyEvent>("image-to-icon", {
    event: "image-converted",
    payload
  });
}

async function convertToICO(filePath: string) {
  // Create an array of image sizes for the ICO file
  const imageSizes = [16, 32, 48, 64];

  // Create an array to store the ICO image data
  const icoImages: Buffer[] = [];

  // Process and convert the input image to ICO format for each size
  for (const size of imageSizes) {
    const buffer = await sharp(filePath).resize(size, size).toBuffer();

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
