import path from "path";

const rootPath = path.join(__dirname, "..");
console.log(rootPath);
const srcPath = path.join(rootPath, "src");
const releasePath = path.join(rootPath, "release");
const appPath = path.join(releasePath, "app");
const distPath = path.join(appPath, "dist");

export default {
  rootPath,
  srcPath,
  appPath,
  distPath,
  releasePath,
  dllPath: path.join(rootPath, "dll"),
  srcMainPath: path.join(srcPath, "main"),
  srcRendererPath: path.join(srcPath, "renderer"),
  appPackagePath: path.join(appPath, "package.json"),
  appNodeModulesPath: path.join(appPath, "node_modules"),
  srcNodeModulesPath: path.join(srcPath, "node_modules"),
  distMainPath: path.join(distPath, "main"),
  distRendererPath: path.join(distPath, "renderer"),
  buildPath: path.join(releasePath, "build")
};
