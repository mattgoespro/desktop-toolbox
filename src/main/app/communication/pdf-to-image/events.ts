import { ChannelEvent } from "../shared/communication";

export type PdfToImageChannel = "pdf-to-image";

export type PdfToImageEvents = "select-file" | "file-selected";

export type PdfToImageEventPayloadMap = {
  "select-file": null;
  "file-selected": {
    filePath: string;
  };
};

export type SelectPdfFileEvent = ChannelEvent<
  PdfToImageChannel,
  PdfToImageEventPayloadMap,
  "select-file"
>;

export type PdfFileSelectedEvent = ChannelEvent<
  PdfToImageChannel,
  PdfToImageEventPayloadMap,
  "file-selected"
>;

export type PdfToImageEventType = SelectPdfFileEvent | PdfFileSelectedEvent;
