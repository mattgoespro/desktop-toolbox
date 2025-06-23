import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";
import packageJson from "./package.json";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: "./src/assets/icon.ico",
    executableName: "DesktopToolbox",
    win32metadata: {
      CompanyName: packageJson.author,
      ProductName: packageJson.displayName,
      FileDescription: packageJson.description
    }
  },
  makers: [
    new MakerSquirrel({
      usePackageJson: true
    })
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        // nodeIntegration: true,
        entryPoints: [
          {
            html: "./src/renderer/index.html",
            js: "./src/renderer/index.tsx",
            name: "main_window",
            preload: {
              js: "./src/shared/framework/preload.ts"
            }
          }
        ]
      },
      port: 9222,
      devContentSecurityPolicy: `default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-eval'; connect-src 'self' ws://localhost:3000; img-src 'self' data:;`
    }),
    /** Fuses are used to enable/disable various Electron functionality
     * at package time, before code signing the application
     */
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true
    })
  ]
};

export default config;
