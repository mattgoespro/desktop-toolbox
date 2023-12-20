import { ChannelEvent } from "../shared/communication";

export type ImageToIconChannel = "image-to-icon";

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

export type Events = ImageFileSelectedReplyEvent | ConvertReplyEvent;
