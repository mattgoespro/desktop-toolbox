import { ChannelEvent } from "main/ipc/channel";

export type PdfToImageEvents = "select-file" | "file-selected";

export type PdfToImageEventPayloadMap = {
  "select-file": null;
  "convert-pdf": {
    filePath: string;
  };
};

export type PdfToImageEventType = SelectFileEvent;

export type SelectFileEvent = ChannelEvent<
  "pdf-to-image",
  PdfToImageEventPayloadMap,
  "select-file"
>;
