import { ImageToIconChannel } from "../../channels";
import { ChannelEvent } from "../../model";

export type ReplyEventMap = {
  "image-converted": {
    outputIconPath?: string;
    error?: {
      message: string;
    };
  };
  "file-selected": {
    filePath?: string;
    error?: {
      message: string;
    };
  };
};

export type ImageConvertedReplyEvent = ChannelEvent<
  ImageToIconChannel,
  ReplyEventMap,
  "image-converted"
>;

export type ImageFileSelectedReplyEvent = ChannelEvent<
  ImageToIconChannel,
  ReplyEventMap,
  "file-selected"
>;

export type ImageToIconRendererEvents = ImageFileSelectedReplyEvent | ImageConvertedReplyEvent;
