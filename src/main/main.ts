/**
 * This module executes inside of electron's main process.
 */
import fs from "fs";
import path from "path";
import electron, { app, BrowserWindow, shell, ipcMain, Menu, MenuItem } from "electron";
import debug from "electron-debug";
import installExtensions, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from "electron-devtools-installer";
import { convertPDF } from "pdf2image";
import { install as installSourceMapSupport } from "source-map-support";
import { resolveHtmlPath } from "./util";

const RESOURCES_PATH = path.resolve(__dirname, "../../resources");

class DesktopTools {
  private resourcesPath = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");
  private window: BrowserWindow;

  constructor(private mode: "debug" | "production") {
    this.window = new BrowserWindow({
      show: false,
      width: 1200,
      height: 800,
      icon: path.join(this.resourcesPath, "icon.png"),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, "preload.js")
          : path.resolve(__dirname, "../../dll/preload.js")
      }
    });

    this.addWindowMenu();

    if (mode === "debug") {
      debug({
        isEnabled: true,
        devToolsMode: "bottom",
        showDevTools: true
      });
    }
  }

  private addWindowMenu() {
    const menu = new Menu();
    menu.insert(0, new MenuItem({ label: "Reload", role: "reload" }));

    if (this.mode === "debug") {
      this.window.webContents.on("context-menu", (_, props) => {
        const { x, y } = props;

        Menu.buildFromTemplate([
          {
            label: "Inspect element",
            click: () => {
              this.window.webContents.inspectElement(x, y);
            }
          }
        ]).popup({ window: this.window });
      });
      return;
    }

    Menu.setApplicationMenu(menu);
  }

  setupDevelopmentEnvironment(): void {}

  public installExtensions() {
    [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(async (extension) => {
      installExtensions(extension, {
        forceDownload: true
      })
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err));
    });

    return this;
  }

  public async addWindowEventListeners() {
    this.window.on("ready-to-show", () => {
      if (!this.window) {
        throw new Error('"mainWindow" is not defined');
      }

      this.window.show();
    });

    this.window.on("close", () => {
      app.quit();
    });

    this.window.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: "deny" };
    });

    return this;
  }

  public async loadApp() {
    await this.window.loadURL(resolveHtmlPath("index.html"));
  }

  /**
   * Configures the IP (Inter-process) communication events between the main and renderer processes.
   */
  public configureIpc() {
    ipcMain.on("pdf-to-image", async (event, pdfPaths) => {
      console.log("convert-pdf-to-image event received", event, pdfPaths);

      convertPDF(pdfPaths, { density: 100, quality: 100 })
        .then((images) => {
          event.reply("pdf-to-image", {
            type: "file-selected",
            payload: images
          });
        })
        .catch((error) => {
          event.reply("pdf-to-image", {
            type: "file-selected",
            error: error.message
          });
        })
        .finally(() => {
          event.reply("pdf-to-image");
        });
    });

    return this;
  }

  public installSourceMapSupport() {
    if (this.mode === "production") {
      installSourceMapSupport({
        environment: "browser",
        hookRequire: true
      });
    }

    return this;
  }
}

function readDirectoryPaths(dirPath: string) {
  return fs
    .readdirSync(dirPath, {
      encoding: "utf8",
      withFileTypes: true
    })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dirPath, entry.name));
}

const isDebugMode =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true"
    ? "debug"
    : "production";

app
  .whenReady()
  .then(async () => {
    const desktopTools = new DesktopTools(isDebugMode);
    await desktopTools.addWindowEventListeners();
    await desktopTools.loadApp();

    const extensionsPath = path.join(RESOURCES_PATH, "devtool-extensions");
    const extensionsDir = readDirectoryPaths(extensionsPath);

    for (const extensionDir of extensionsDir) {
      const versionDir = readDirectoryPaths(extensionDir)[0];
      await electron.session.defaultSession.loadExtension(
        path.join(extensionsPath, extensionDir, versionDir)
      );
    }
  })
  .catch((err) => {
    console.error("Error creating window: ", err);
  });
