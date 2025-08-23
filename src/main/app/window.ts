import electron, { Menu, BrowserWindow } from "electron";
import installDevToolExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";
import { inDevMode } from "../utils";
import packageJson from "../../../package.json";
import { iconSmithEventHandler } from "./ipc/iconsmith";
import { ApplicationLogger } from "./logger";
import path from "path";

type DesktopToolsWindowConfig = {
  windowEvents: {
    onReady: (window: BrowserWindow) => void;
    onClose: () => void;
  };
  icon?: string;
};

export class DesktopToolsWindow {
  private window: BrowserWindow;
  private logger = ApplicationLogger.getInstance();

  constructor(private config: DesktopToolsWindowConfig) {
    this.window = new BrowserWindow({
      title: packageJson.displayName,
      icon: config.icon,
      width: 1200,
      height: 1600,
      show: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js")
      },
      darkTheme: true,
      backgroundColor: "#1e1e1e"
    });

    this.window.on("ready-to-show", async () => {
      this.logger.info("Window is ready to show.");
      config.windowEvents.onReady(this.window);
    });

    this.window.on("close", () => {
      config.windowEvents.onClose();
      this.logger.info("Window closed.");
    });

    this.window.on("session-end", (event) => {
      this.logger.info(`The session has ended. Reason: ${event.reasons.join(", ")}`);
      this.window.close();
    });

    this.attachToMainProcess(iconSmithEventHandler);
  }

  public async init() {
    if (inDevMode()) {
      await this.installDevToolExtensions();

      this.setApplicationMenu();

      this.window.webContents.openDevTools({
        mode: "right",
        activate: true,
        title: "Main Window DevTools"
      });
    }

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      console.log(MAIN_WINDOW_VITE_DEV_SERVER_URL);
      await this.window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      await this.window.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
      );
    }
    // await this.window.loadURL(this.config.windowEntry);
  }

  private attachToMainProcess(attachHandler: (ipcMain: Electron.IpcMain) => void) {
    attachHandler(electron.ipcMain);
  }

  public async installDevToolExtensions() {
    const devtoolsExtensions = [
      {
        name: "react-devtools",
        reference: REACT_DEVELOPER_TOOLS
      },
      {
        name: "redux-devtools",
        reference: REDUX_DEVTOOLS
      }
    ];

    for (const supportedExtension of devtoolsExtensions) {
      const extensionReference = supportedExtension.reference;

      try {
        await installDevToolExtension(extensionReference, {
          forceDownload: true,
          session: this.window.webContents.session,
          loadExtensionOptions: {
            allowFileAccess: true
          }
        });

        this.logger.info(
          `Installed DevTools extension: ${supportedExtension.name} (${extensionReference.id})`
        );
      } catch (error) {
        throw new Error(
          [
            `Failed to install devtools extension: ${supportedExtension.name}`,
            `Message: ${error.message}`,
            `Details: ${error.stack}`
          ].join("\n")
        );
      }
    }

    return this;
  }

  private setApplicationMenu() {
    const menu = Menu.buildFromTemplate([
      {
        label: "File",
        submenu: [
          {
            label: "Exit",
            role: "quit"
          },
          { label: "Reload", role: "reload", accelerator: "Ctrl+R" },
          {
            label: "DevTools",
            role: "toggleDevTools",
            accelerator: "Ctrl+`"
          }
        ]
      }
    ]);

    Menu.setApplicationMenu(menu);

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
  }
}
