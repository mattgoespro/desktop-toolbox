import { PdfToImageChannel } from "main/app/communication/pdf-to-image/events";
import { ChannelEvent } from "main/app/communication/shared/communication";

export type RendererPdfToImageEventPayloadMap = {
  "select-file": null;
};

export type RendererPdfToImageSelectFileEvent = ChannelEvent<
  PdfToImageChannel,
  RendererPdfToImageEventPayloadMap,
  "select-file"
>;

export type RendererPdfToImageEvents = RendererPdfToImageSelectFileEvent;
