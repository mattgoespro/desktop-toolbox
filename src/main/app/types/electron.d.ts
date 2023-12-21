import * as imageToIconEvents from "../communication/image-to-icon/events";
import * as pdfToImageEvents from "../communication/pdf-to-image/events";
import { ChannelEvent, Channel } from "../communication/shared/window-event-emitter";

declare module "electron" {
  namespace Electron {
    type Channels =
      | {
          channel: imageToIconEvents.ImageToIconChannel;
          events: imageToIconEvents.Events;
        }
      | { channel: pdfToImageEvents.PdfToImageChannel; events: pdfToImageEvents.PdfToImageEvent };

    interface IpcMainEvent {
      /**
       * A function that will send an IPC message to the renderer frame that sent the
       * original message that you are currently handling.  You should use this method to
       * "reply" to the sent message in order to guarantee the reply will go to the
       * correct process and frame.
       */
      reply<T extends ChannelEvent<string>>(channel: Channel<T>, payload: Omit<T, "channel">): void;
      on<T extends ChannelEvent<string>>(
        channel: Channel<T>,
        listener: (event: IpcMainEvent, payload: T) => void
      ): this;
    }
  }
}
