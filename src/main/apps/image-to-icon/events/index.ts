import { ChannelEvent } from "../../../shared/window-event-emitter";

export type ImageToIconChannel = "image-to-icon";

export type ImageToIconEvents = "select-file";

export type ImageToIconEventPayloadMap = {
  "select-file": null;
  "file-selected": {
    filePath: string;
  };
  "convert-image": {
    filePath: string;
  };
};

export type ImageFileSelectedEvent = ChannelEvent<
  ImageToIconChannel,
  ImageToIconEventPayloadMap,
  "file-selected"
>;

export type SelectImageFileEvent = ChannelEvent<
  ImageToIconChannel,
  ImageToIconEventPayloadMap,
  "select-file"
>;

export type ImageToIconEventType =
  | SelectImageFileEvent
  | ImageFileSelectedEvent
  | ConvertImageEvent;

export type ConvertImageEvent = ChannelEvent<
  "image-to-icon",
  ImageToIconEventPayloadMap,
  "convert-image"
>;
