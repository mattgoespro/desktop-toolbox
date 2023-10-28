import { ChannelEvent } from "../../../channel";

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

export type ImageToIconEventType = SelectFileEvent | FileSelectedEvent | ConvertImageEvent;

export type SelectFileEvent = ChannelEvent<
  "image-to-icon",
  ImageToIconEventPayloadMap,
  "select-file"
>;

export type FileSelectedEvent = ChannelEvent<
  "image-to-icon",
  ImageToIconEventPayloadMap,
  "file-selected"
>;

export type ConvertImageEvent = ChannelEvent<
  "image-to-icon",
  ImageToIconEventPayloadMap,
  "convert-image"
>;
