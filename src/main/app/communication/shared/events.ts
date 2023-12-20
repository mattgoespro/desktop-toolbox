import { ChannelEvent } from "./window-event-emitter";

export type EventPayloadMap = {
  "select-file": <T>() => {
    options: T;
  };
  "file-selected": {
    filePath: string;
  };
  "save-to-directory": {
    filePath: string;
    directoryPath: string;
  };
};

export type SelectFileEvent<Channel extends string> = ChannelEvent<
  Channel,
  EventPayloadMap,
  "select-file"
>;

export type FileSelectedEvent<Channel extends string> = ChannelEvent<
  Channel,
  EventPayloadMap,
  "file-selected"
>;

export type SaveToFolderEvent<Channel extends string> = ChannelEvent<
  Channel,
  EventPayloadMap,
  "save-to-directory"
>;
