import { ChannelEvent } from "./channel";

export type ImageToIconEvents = "select-file" | "file-selected";

export type ImageToIconEventMap = {
  "select-file": null;
  "file-selected": {
    filePath: string;
  };
};

export type ImageToIconEventType = SelectFileEvent | FileSelectedEvent;

export type SelectFileEvent = ChannelEvent<"image-to-icon", ImageToIconEventMap, "select-file">;

export type FileSelectedEvent = ChannelEvent<"image-to-icon", ImageToIconEventMap, "file-selected">;
