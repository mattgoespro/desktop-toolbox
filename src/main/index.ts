/**
 * Executes inside of electron's main process.
 */
import { app } from "electron";
import { DesktopToolsWindow } from "./window";
import path from "path";

async function createApplicationWindow() {
  const window = new DesktopToolsWindow({
    windowEvents: {
      onReady: (window) => {
        window.show();
      },
      onClose: (window) => {
        window.close();
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
