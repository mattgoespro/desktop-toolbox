import { ChannelEvent } from "../../model";
import { IconSmithChannel } from "../../channels";

export type MainEventPayloadMap = {
  "select-file": {
    id: string;
  };
  "convert-image-to-icon": {
    imageFilePath?: string;
    error?: {
      message: string;
    };
  };
};

export type ConvertImageToIconActionEvent = ChannelEvent<
  IconSmithChannel,
  MainEventPayloadMap,
  "convert-image-to-icon"
>;

export type IconSmithActionEvents = ConvertImageToIconActionEvent;
