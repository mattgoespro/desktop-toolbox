import { createRoot } from "react-dom/client";
import { App } from "./app/app";

async function waitForReactDevTools() {
  if (process.env.NODE_ENV === "development") {
    const start = Date.now();

    while (
      typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" &&
      Date.now() - start < 2000
    ) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
}

waitForReactDevTools().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
  console.log(`Launched renderer application in ${process.env.NODE_ENV} mode.`);
});
