import path from "path";
import electron, { app, Menu, shell, BrowserWindow } from "electron";
import installDevToolExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS as REACT_DEVTOOLS
} from "electron-devtools-installer";
import { install as installSourceMapSupport } from "source-map-support";
import { imageToIconEventHandler } from "./app/communication/image-to-icon/event-handlers";
import { inDebugMode, inProductionMode, resolveHtmlPath } from "./utils";

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

  private addWindowMenu() {
    const menu = Menu.buildFromTemplate([
      {
        label: "File",
        submenu: [
          {
            label: "Exit",
            role: "quit"
          },
          { label: "Reload", role: "reload" },
          // open devtools
          {
            label: "DevTools",
            role: "toggleDevTools"
          }
        ]
      }
    ]);

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

  public async installDevToolExtensions() {
    const supportedExtensions = {
      [REACT_DEVTOOLS.id]: {
        name: "react-devtools",
        reference: REACT_DEVTOOLS
      },
      [REDUX_DEVTOOLS.id]: {
        name: "redux-devtools",
        reference: REDUX_DEVTOOLS
      }
    };

    for (const supportedExtension of Object.entries(supportedExtensions)) {
      const extensionId = supportedExtension[0];
      const extensionDetails = supportedExtension[1];

      try {
        await installDevToolExtension(extensionDetails.reference, {
          forceDownload: true,
          loadExtensionOptions: {
            allowFileAccess: true
          }
        });

        console.log(`Installed extension: ${extensionDetails.name} (${extensionId})`);
      } catch (error) {
        throw new Error(
          `Failed to install devtools extension: ${extensionDetails.name}\nMessage: ${error.message}\nDetails: ${error.stack}`
        );
      }
    }

    return this;
  }

  public async loadApp() {
    await this.window.loadURL(resolveHtmlPath("index.html"));
  }
}
