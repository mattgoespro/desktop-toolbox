/**
 * This module executes inside of electron's main process.
 */
import { app, BrowserWindow } from "electron";
import { DesktopToolsWindow } from "./window";

app.on("ready", async () => {
  createApplicationWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createApplicationWindow();
  }
});
function createApplicationWindow() {
  const window = new DesktopToolsWindow();
  window.init();
}
