import { ImageToIconChannel } from "main/app/communication/image-to-icon/events";
import { ChannelEvent } from "main/app/communication/shared/communication";

export type EventPayloadMap = {
  "select-file": {
    id: string;
  };
  "convert-image": {
    id: string;
    filePath: string;
  };
};

export type SelectImageFileEvent = ChannelEvent<ImageToIconChannel, EventPayloadMap, "select-file">;

export type ConvertImageEvent = ChannelEvent<"image-to-icon", EventPayloadMap, "convert-image">;

export type Events = SelectImageFileEvent | ConvertImageEvent;
