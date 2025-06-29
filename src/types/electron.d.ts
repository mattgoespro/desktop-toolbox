// types/electron-ipc-augment.d.ts
import { ChannelEvent, Channel } from "../shared/ipc/model";
import "electron";

declare module "electron" {
  namespace Electron {
    namespace CrossProcessExports {
      interface IpcMainEvent {
        reply<T extends ChannelEvent<string>>(
          channel: Channel<T>,
          payload: Omit<T, "channel">
        ): void;
        on<T extends ChannelEvent<string>>(
          channel: Channel<T>,
          listener: (event: IpcMainEvent, payload: T) => void
        ): this;
      }

      interface IpcMain {
        handle<T extends ChannelEvent<string>>(
          channel: Channel<T>,
          listener: (event: IpcMainEvent, payload: T) => void
        ): this;
        handleOnce<T extends ChannelEvent<string>>(
          channel: Channel<T>,
          listener: (event: IpcMainEvent, payload: T) => void
        ): this;
      }
    }

    type IpcMainEvent = CrossProcessExports.IpcMainEvent;
    type IpcMain = IpcMain;
  }

  export = Electron;
}
