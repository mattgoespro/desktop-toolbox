import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config
export default defineConfig({
  // configure tsx
  plugins: [tsconfigPaths()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  build: {
    rollupOptions: {
      external: ["sharp"],
      output: {
        // output file name
        entryFileNames: "main.js"
      }
    }
  }
});
