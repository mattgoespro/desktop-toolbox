import electron, { Menu, BrowserWindow } from "electron";
import installDevToolExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";
import { inDevMode } from "../utils";
import packageJson from "../../../package.json";
import { iconSmithEventHandler } from "./ipc/iconsmith";

type DesktopToolsWindowConfig = {
  windowEntry: string;
  windowPreloadEntry: string;
  windowEvents: {
    onReady: (window: BrowserWindow) => void;
    onClose: () => void;
  };
  icon?: string;
};

export class DesktopToolsWindow {
  private window: BrowserWindow;

  constructor(private config: DesktopToolsWindowConfig) {
    console.log("Main window webpack entry:", config.windowEntry);
    console.log("Main window preload webpack entry:", config.windowPreloadEntry);

    this.window = new BrowserWindow({
      title: packageJson.displayName,
      icon: config.icon,
      width: 1200,
      height: 1600,
      show: false,
      webPreferences: {
        preload: config.windowPreloadEntry,
        nodeIntegration: true
      },
      darkTheme: true,
      backgroundColor: "#1e1e1e"
    });

    this.window.on("ready-to-show", () => {
      config.windowEvents.onReady(this.window);
    });

    this.window.on("close", () => {
      config.windowEvents.onClose();
    });

    this.attachToMainProcess(iconSmithEventHandler);
  }

  public async init() {
    await this.installDevToolExtensions();

    await this.window.loadURL(this.config.windowEntry);

    if (inDevMode()) {
      this.addWindowDevMenu();
      this.window.webContents.openDevTools({
        mode: "right",
        activate: true,
        title: "Main Window DevTools"
      });
    }
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

        console.log(
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

  private addWindowDevMenu() {
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
