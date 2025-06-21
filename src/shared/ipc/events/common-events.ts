import { ChannelEvent } from "../model";

type CommonEventPayloadMap = {
  "select-file": {
    options: unknown;
  };
  "file-selected": {
    filePath: string;
  };
  "save-to-directory": {
    filePath: string;
    directoryPath: string;
  };
};

export type SelectFileActionEvent<Channel extends string> = ChannelEvent<
  Channel,
  CommonEventPayloadMap,
  "select-file"
>;

export type SaveToFolderActionEvent<Channel extends string> = ChannelEvent<
  Channel,
  CommonEventPayloadMap,
  "save-to-directory"
>;

export type FileSelectedResponseEvent<Channel extends string> = ChannelEvent<
  Channel,
  CommonEventPayloadMap,
  "file-selected"
>;

export type CommonEvents<Channel extends string = string> =
  | SelectFileActionEvent<Channel>
  | SaveToFolderActionEvent<Channel>
  | FileSelectedResponseEvent<Channel>;
