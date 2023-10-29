import fs from "fs";
import Jimp from "jimp";

export async function convertToIcon(inputImagePath: string, outputIcoPath: string) {
  // Use Jimp to read the image
  const image = await Jimp.read(inputImagePath);

  // Create an array of image sizes for the ICO file
  const sizes = [16, 32, 48, 64, 128];

  // Create an array to store image buffers
  const imageBuffers = await Promise.all(
    sizes.map(async (size) => {
      const resizedImage = await image.clone().resize(size, size);
      return resizedImage.getBufferAsync(Jimp.MIME_PNG);
    })
  );

  // Write the ICO file header
  const header = Buffer.from([0, 0, 1, 0, 1, 0]);

  // Write the ICO file directory entries
  const directoryEntries = Buffer.concat(
    sizes.map((size, index) => {
      const imageSize = imageBuffers[index].length;
      const offset =
        6 +
        16 * sizes.length +
        imageBuffers.slice(0, index).reduce((sum, buf) => sum + buf.length, 0);
      return Buffer.from([size, size, 0, 0, 1, 0, 32, 0, imageSize, offset]);
    })
  );

  // Combine the header, directory entries, and image buffers
  const icoData = Buffer.concat([header, directoryEntries, ...imageBuffers]);

  // Write the ICO data to the output file
  fs.writeFileSync(outputIcoPath, icoData);

  return outputIcoPath;
}
