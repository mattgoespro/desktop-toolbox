import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";
import { ChannelEvent } from "./ipc/events/channel";

const electronHandler = {
  windowEventEmitter: {
    emitEvent<T extends ChannelEvent>(
      channel: T["channel"],
      event: T["event"],
      payload: T["payload"] = undefined
    ) {
      ipcRenderer.send(channel, event, payload);
    },
    handleEvent<T extends ChannelEvent>(
      channel: T["channel"],
      func: (payload: T["payload"]) => void
    ) {
      const subscription = (_event: IpcRendererEvent, payload: T["payload"]) => func(payload);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    }
  }
};

contextBridge.exposeInMainWorld("electron", electronHandler);

export type WindowEventEmitter = typeof electronHandler.windowEventEmitter;
export type ElectronHandler = typeof electronHandler;
