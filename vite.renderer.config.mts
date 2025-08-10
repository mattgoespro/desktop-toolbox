import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".html"]
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src", "renderer", "index.html")
      }
    }
  }
});
