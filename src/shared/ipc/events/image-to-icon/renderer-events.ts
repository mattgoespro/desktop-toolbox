import { IconSmithChannel } from "../../channels";
import { ChannelEvent } from "../../model";
import { SelectFileActionEvent } from "../common-events";

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
  IconSmithChannel,
  ReplyEventMap,
  "image-converted"
>;

export type ImageFileSelectedReplyEvent = ChannelEvent<
  IconSmithChannel,
  ReplyEventMap,
  "file-selected"
>;

export type ImageToIconRendererEvents =
  | SelectFileActionEvent<IconSmithChannel>
  | ImageFileSelectedReplyEvent
  | ImageConvertedReplyEvent;
