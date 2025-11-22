import electron from "electron";
import fs, { createWriteStream } from "fs";
import path from "path";
import { pipeline, Readable } from "stream";
import { ReadableStream } from "stream/web";
import { promisify } from "util";

export function getPath() {
  const savePath = electron.app.getPath("userData");
  return path.resolve(savePath, "extensions");
}

const streamPipeline = promisify(pipeline);

export async function downloadFile(url: string, toPath: string) {
  const res = await fetch(url);

  if (!res.ok || !res.body) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }

  const nodeStream = Readable.fromWeb(res.body as ReadableStream<Uint8Array>);
  return streamPipeline(nodeStream, createWriteStream(toPath));
}

export function changePermissions(dir: string, mode: number) {
  const files = fs
    .readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((f) => f.isFile());

  files.forEach((file) => {
    fs.chmodSync(path.join(dir, file.name), parseInt(`${mode}`, 8));
  });
}
