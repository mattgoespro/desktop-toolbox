import { ChannelEvent, Channel } from "../shared/ipc/model";
import { ImageToIconChannel } from "../shared/ipc/channels";
import { ImageToIconEvents } from "../shared/ipc/events";

module "electron" {
  namespace Electron {
    type Channels = {
      channel: ImageToIconChannel;
      events: ImageToIconEvents;
    };

    interface IpcMainEvent {
      /**
       * A function that will send an IPC message to the renderer frame that sent the
       * original message that you are currently handling.  You should use this method to
       * "reply" to the sent message in order to guarantee the reply will go to the
       * correct process and frame.
       */
      reply<T extends ChannelEvent<string>>(channel: Channel<T>, payload: Omit<T, "channel">): void;
    }
  }
}
