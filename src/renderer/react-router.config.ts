import type { Config } from "@react-router/dev/config";
import path from "path";

export default {
  ssr: false, // SPA mode
  appDirectory: path.resolve(__dirname, "app")
} satisfies Config;
