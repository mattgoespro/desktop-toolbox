/**
 * Executes inside of electron's main process.
 */
import { app } from "electron";
import { DesktopToolsWindow } from "./app/window";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-require-imports
if (require("electron-squirrel-startup")) app.quit();

app.setAppUserModelId("com.squirrel.DesktopToolbox.DesktopToolbox");

async function createApplicationWindow() {
  const window = new DesktopToolsWindow({
    windowEvents: {
      onReady: (window) => {
        window.show();
      },
      onClose: () => {
        app.quit();
      }
    },
    icon: app.isPackaged
      ? path.join(process.resourcesPath, "assets")
      : path.join(__dirname, "../../assets")
  });
  return window;
}

app.on("ready", async () => {
  const appWindow = await createApplicationWindow();
  await appWindow.init();
});
