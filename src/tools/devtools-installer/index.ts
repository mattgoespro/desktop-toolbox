import { session } from "electron";
import { downloadChromeExtension } from "./download-chrome-extension";
import { ExtensionReference, InstallExtensionOptions } from "./model";

export async function installExtension(
  extension: ExtensionReference,
  options: InstallExtensionOptions = {}
) {
  const { forceDownload, loadExtensionOptions } = options;

  const chromeStoreID = extension.id;
  const installedExtensions = session.defaultSession.extensions.getAllExtensions();

  const installedExtension = installedExtensions.find((e) => e.id === chromeStoreID);

  // If we found an installed extension and we're not forcing a download, return it
  if (!forceDownload && installedExtension != null) {
    return installedExtension;
  }

  let extensionFolder = installedExtension.path;

  if (forceDownload) {
    extensionFolder = await downloadChromeExtension(chromeStoreID, forceDownload ?? false);
  }

  return session.defaultSession.extensions.loadExtension(extensionFolder, loadExtensionOptions);
}

export const EMBER_INSPECTOR: ExtensionReference = {
  id: "bmdblncegkenkacieihfhpjfppoconhi"
};
export const REACT_DEVELOPER_TOOLS: ExtensionReference = {
  id: "fmkadmapgofadopljbjfkapdkoienihi"
};
export const BACKBONE_DEBUGGER: ExtensionReference = {
  id: "bhljhndlimiafopmmhjlgfpnnchjjbhd"
};
export const JQUERY_DEBUGGER: ExtensionReference = {
  id: "dbhhnnnpaeobfddmlalhnehgclcmjimi"
};
export const VUEJS_DEVTOOLS: ExtensionReference = {
  id: "nhdogjmejiglipccpnnnanhbledajbpd"
};
export const VUEJS_DEVTOOLS_BETA: ExtensionReference = {
  id: "ljjemllljcmogpfapbkkighbhhppjdbg"
};
export const REDUX_DEVTOOLS: ExtensionReference = {
  id: "lmhkpmbekcpmknklioeibfkpmmfibljd"
};
export const MOBX_DEVTOOLS: ExtensionReference = {
  id: "pfgnfdagidkfgccljigdamigbcnndkod"
};
