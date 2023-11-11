import fs from "fs";
import os from "os";
import path from "path";
import electron, { app, Menu, MenuItem, shell, BrowserWindow } from "electron";
import installDevToolExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS as REACT_DEVTOOLS,
  DevToolExtension
} from "electron-devtools-installer";
import { install as installSourceMapSupport } from "source-map-support";
import { imageToIconEventHandler } from "./apps/image-to-icon/event-handlers";
import { getChildDirectories, inDebugMode, inProductionMode, resolveHtmlPath } from "./util/utils";

export class DesktopToolsWindow {
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
        nodeIntegration: true,
        webSecurity: false
      }
    });

    this.addWindowMenu();
  }

  private useResourceDevTools() {
    return Boolean(process.env.RESOURCE_DEVTOOLS ?? false);
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

    this.attachToMainProcess(imageToIconEventHandler);

    return this;
  }

  private attachToMainProcess(attachHandler: (ipcMain: Electron.IpcMain) => void) {
    attachHandler(electron.ipcMain);
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

  private async installDevToolsFromChromeDirectory(
    supportedExtensions: Map<string, DevToolExtension>
  ) {
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

  private async installDevToolsFromElectronDevToolsInstaller(
    supportedExtensions: Map<string, DevToolExtension>
  ) {
    for (const supportedExtension of supportedExtensions.keys()) {
      const extension = supportedExtensions.get(supportedExtension);
      const extensionName = extension.name;

      try {
        await installDevToolExtension(extension.reference, {
          forceDownload: true,
          loadExtensionOptions: {
            allowFileAccess: true
          }
        });

        console.log(`Installed ${extensionName}`);
      } catch (err) {
        throw this.createInstallExtensionError(extensionName, err);
      }
    }
  }

  public async installDevToolExtensions() {
    const supportedExtensions = new Map<string, DevToolExtension>()
      .set(REACT_DEVTOOLS.id, {
        name: "react-devtools",
        version: "4.28.5_2",
        reference: REACT_DEVTOOLS
      })
      .set(REDUX_DEVTOOLS.id, {
        name: "redux-devtools",
        version: "3.1.3_0",
        reference: REDUX_DEVTOOLS
      });

    if (this.useResourceDevTools()) {
      console.log(`Installing devtool extensions from Chrome directory\n`);
      await this.installDevToolsFromChromeDirectory(supportedExtensions);
      return this;
    }

    console.log(`Installing devtool extensions from 'electron-devtools-installer'\n`);
    await this.installDevToolsFromElectronDevToolsInstaller(supportedExtensions);

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
