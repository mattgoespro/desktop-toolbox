/**
 * This module executes inside of electron's main process.
 */
import { app } from "electron";
import debug from "electron-debug";
import { DesktopToolsWindow } from "./desktop-tools-window";
import { inDebugMode } from "./util/utils";

if (inDebugMode()) {
  debug({
    devToolsMode: "right",
    showDevTools: true
  });
}

app
  .whenReady()
  .then(async () => {
    const window = new DesktopToolsWindow();
    await window.addWindowEventListeners();
    await window.installDevToolExtensions();
    await window.loadApp();
  })
  .catch((err) => {
    console.error("Error creating window: ", err);
  });
