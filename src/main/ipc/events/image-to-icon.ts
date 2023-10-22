import { ChannelEvent } from "./channel";

export interface FileSelectedEventPayload {
  filePath: string;
}

export type SelectFileEvent = ChannelEvent<
  "image-to-icon",
  "select-file",
  FileSelectedEventPayload
>;

export type FileSelectedEvent = ChannelEvent<
  "image-to-icon",
  "file-selected",
  FileSelectedEventPayload
>;
