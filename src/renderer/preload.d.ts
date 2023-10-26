import { compose } from "@reduxjs/toolkit";
import { ElectronHandler } from "../main/preload";

declare global {
  interface Window {
    electron: ElectronHandler;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

export {};
