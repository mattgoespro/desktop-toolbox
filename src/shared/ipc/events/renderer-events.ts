import { ImageToIconChannel } from "../channels";
import { ChannelEvent } from "../model";

export type ReplyEventMap = {
  "convert-image-reply": {
    id: string;
    outputIconPath?: string;
    error?: {
      message: string;
    };
  };
  "file-selected": {
    id: string;
    filePath: string;
  };
};

export type ConvertReplyEvent = ChannelEvent<
  ImageToIconChannel,
  ReplyEventMap,
  "convert-image-reply"
>;

export type ImageFileSelectedReplyEvent = ChannelEvent<
  ImageToIconChannel,
  ReplyEventMap,
  "file-selected"
>;

export type ImageToIconEvents = ImageFileSelectedReplyEvent | ConvertReplyEvent;
