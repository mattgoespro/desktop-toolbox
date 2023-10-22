import { ConvertedFile } from "pdf2image";
import { ChannelEvent } from "./channel";

export interface FileSelectedEventPayload {
  file: ConvertedFile;
}

export type SelectFileEvent = ChannelEvent<"pdf-to-file", "select-file", FileSelectedEventPayload>;

export type FileSelectedEvent = ChannelEvent<
  "pdf-to-file",
  "file-selected",
  FileSelectedEventPayload
>;
