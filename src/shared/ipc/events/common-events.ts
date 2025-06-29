import { ChannelEvent } from "../model";

type CommonEventPayloadMap = {
  "select-file": {
    options: unknown;
  };
  "file-selected": {
    filePath?: string;
    error?: {
      message: string;
    };
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

export type FileSelectedReplyEvent<Channel extends string> = ChannelEvent<
  Channel,
  CommonEventPayloadMap,
  "file-selected"
>;
