import { LoadExtensionOptions } from "electron";

export interface ExtensionReference {
  /**
   * Extension ID
   */
  id: string;
}

export interface InstallExtensionOptions {
  forceDownload?: boolean;
  loadExtensionOptions?: LoadExtensionOptions;
}

export declare const EMBER_INSPECTOR: ExtensionReference;
export declare const REACT_DEVELOPER_TOOLS: ExtensionReference;
export declare const BACKBONE_DEBUGGER: ExtensionReference;
export declare const JQUERY_DEBUGGER: ExtensionReference;
export declare const VUEJS_DEVTOOLS: ExtensionReference;
export declare const VUEJS_DEVTOOLS_BETA: ExtensionReference;
export declare const REDUX_DEVTOOLS: ExtensionReference;
export declare const MOBX_DEVTOOLS: ExtensionReference;
