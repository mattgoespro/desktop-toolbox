// src/renderer/react-router.config.ts
import path from "path";
import type { Config } from "@react-router/dev/config";

// This resolves to: <project-root>/src/renderer/app
const appDir = path.resolve(__dirname, "app");

export default {
  ssr: false, // SPA mode
  appDirectory: appDir // Absolute path to your app dir
} satisfies Config;
