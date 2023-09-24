/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from "path";
import { app, BrowserWindow, shell, ipcMain } from "electron";
import debug from "electron-debug";
import installDebugTools, {
  REACT_DEVELOPER_TOOLS,
  BACKBONE_DEBUGGER
} from "electron-devtools-installer";
import log from "electron-log";
import { autoUpdater } from "electron-updater";
import { install as installSourceMapSupport } from "source-map-support";
import MenuBuilder from "./menu";
import { resolveHtmlPath } from "./util";

if (process.env.NODE_ENV === "production") {
  installSourceMapSupport();
}

const isDebug = process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

async function startDebugger() {
  await installDebugTools([REACT_DEVELOPER_TOOLS, BACKBONE_DEBUGGER], {
    forceDownload: !!process.env.UPGRADE_EXTENSIONS
  });
  debug();
}

async function createWindow() {
  if (isDebug) {
    await startDebugger();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  const mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: path.join(RESOURCES_PATH, "icon.png"),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, "preload.js")
        : path.join(__dirname, "../../dll/preload.js")
    }
  });

  mainWindow.loadURL(resolveHtmlPath("index.html"));

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }

    mainWindow.show();
  });

  mainWindow.on("close", () => {
    app.quit();
  });

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  log.transports.file.level = "info";
  autoUpdater.logger = log;
  autoUpdater.checkForUpdates();
}

/**
 * Configures the IP (Inter-process) communication events between the main and renderer processes.
 */
function configureIpc(): void {
  ipcMain.on("ipc-example", async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply("ipc-example", msgTemplate("pong"));
  });
}

configureIpc();

app
  .whenReady()
  .then(() => {
    createWindow();
  })
  .catch((err) => {
    console.error("Error creating window: ", err);
  });
