import { ImageToIconEventPayloadMap } from "../apps/image-to-icon/events";
import { ChannelEvent } from "./window-event-emitter";

export type SelectFileEvent<Channel extends string> = ChannelEvent<
  Channel,
  ImageToIconEventPayloadMap,
  "select-file"
>;

export type FileSelectedEvent<Channel extends string> = ChannelEvent<
  Channel,
  ImageToIconEventPayloadMap,
  "file-selected"
>;
