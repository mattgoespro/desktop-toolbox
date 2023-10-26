import fs from "fs";
import os from "os";
import path from "path";
import electron, { app, BrowserWindow, Menu, MenuItem, shell, ipcMain } from "electron";
import installDevToolExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS as REACT_DEVTOOLS
} from "electron-devtools-installer";
import { install as installSourceMapSupport } from "source-map-support";
import { ImageToIconListener } from "./ipc/event-handlers/image-to-icon-handler";
import { PdfToImageListener } from "./ipc/event-handlers/pdf-to-image-handler";
import { getChildDirectories, inDebugMode, inProductionMode, resolveHtmlPath } from "./util";

export class DesktopToolsWindow {
  private RESOURCE_DEVTOOLS = process.env.RESOURCE_DEVTOOLS;

  private resourcesPath = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  private window: BrowserWindow;

  constructor() {
    this.window = new BrowserWindow({
      show: false,
      width: 1200,
      height: 800,
      icon: path.join(this.resourcesPath, "icon.png"),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, "preload.js")
          : path.resolve(__dirname, "../../dll/preload.js"),
        nodeIntegration: true
      }
    });

    this.addWindowMenu();
  }

  private addWindowMenu() {
    const menu = new Menu();
    menu.insert(0, new MenuItem({ label: "Reload", role: "reload" }));

    if (inDebugMode()) {
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

  public async addWindowEventListeners() {
    this.window.on("ready-to-show", () => {
      if (!this.window) {
        throw new Error('"mainWindow" is not defined');
      }

      this.window.webContents.openDevTools();
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

  /**
   * Configures the IP (Inter-process) communication events between the main and renderer processes.
   */
  public configureIpc() {
    ipcMain.on("pdf-to-image", PdfToImageListener);
    ipcMain.on("image-to-icon", ImageToIconListener);
    return this;
  }

  public installSourceMapSupport() {
    if (inProductionMode()) {
      installSourceMapSupport({
        environment: "browser",
        hookRequire: true
      });
    }

    return this;
  }

  public async installDevToolExtensions() {
    const supportedExtensions = new Map([
      [REACT_DEVTOOLS.id, ["react-devtools", "4.28.4_0", REACT_DEVTOOLS]],
      [REDUX_DEVTOOLS.id, ["redux-devtools", "3.1.3_0", REDUX_DEVTOOLS]]
    ]);

    if (this.RESOURCE_DEVTOOLS === "true") {
      const chromeExtensionsDirectory = path.join(
        os.homedir(),
        "AppData",
        "Local",
        "Google",
        "Chrome",
        "User Data",
        "Default",
        "Extensions"
      );

      if (!fs.existsSync(chromeExtensionsDirectory)) {
        throw new Error("devtool extensions: could not find Chrome extensions directory");
      }

      const extensionDirs = getChildDirectories(chromeExtensionsDirectory);

      for (const extensionDir of extensionDirs) {
        const extensionId = extensionDir.name;

        if (supportedExtensions.has(extensionId)) {
          const extension = supportedExtensions.get(extensionId);
          const extensionName = extension[0] as string;
          const extensionVersion = extension[1];

          const installedVersion = getChildDirectories(extensionDir.path)[0];

          if (installedVersion.name !== extensionVersion) {
            throw new Error(
              `devtool extensions: installed version of ${extensionName} (${installedVersion.name}) does not match required version (${extensionVersion})`
            );
          }

          try {
            await electron.session.defaultSession.loadExtension(
              path.join(extensionDir.path, extensionVersion),
              {
                allowFileAccess: true
              }
            );

            console.log(`devtool extensions: installed ${extensionName} (id: ${extensionId})`);
          } catch (err) {
            throw this.createInstallExtensionError(extensionName, err);
          }
        }
      }
      return;
    }

    console.log(`Installing devtool extensions from 'electron-devtools-installer'\\n`);

    for (const extension of Object.values(supportedExtensions)) {
      try {
        console.log(`Installing ${extension.name}...`);

        await installDevToolExtension(extension.reference, {
          forceDownload: true,
          loadExtensionOptions: { allowFileAccess: true }
        });

        console.log(`Installed ${extension.name}`);
      } catch (err) {
        throw this.createInstallExtensionError(extension.name, err);
      }
    }

    return this;
  }

  private createInstallExtensionError(extensionName: string, error: Error) {
    const installError = new Error(`${extensionName} devtools install failed`);
    installError.stack = `${installError.message}\n${error.stack}`;
    return installError;
  }

  public async loadApp() {
    await this.window.loadURL(resolveHtmlPath("index.html"));
  }
}