import { ChannelEvent } from "../model";
import { ImageToIconChannel } from "../channels";

export type MainEventPayloadMap = {
  "select-file": {
    id: string;
  };
  "convert-image": {
    id: string;
    filePath: string;
  };
};

export type SelectImageFileActionEvent = ChannelEvent<
  ImageToIconChannel,
  MainEventPayloadMap,
  "select-file"
>;

export type ConvertImageActionEvent = ChannelEvent<
  "image-to-icon",
  MainEventPayloadMap,
  "convert-image"
>;
