import { ChildProcess, spawn } from "child_process";
import path from "path";

export function startPreloadTaskMiddleware() {
  console.log("Starting preload.js builder...");
  console.log(path.resolve(__dirname, "./config.renderer.dev.ts"));
  const preloadProcess = spawn(
    "webpack",
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ["--config", path.resolve(__dirname, "./config.renderer.dev.ts")],
    {
      shell: true,
      env: {
        NODE_ENV: "development",
        TS_NODE_TRANSPILE_ONLY: "true"
      },
      stdio: "inherit"
    }
  )
    .on("close", (code: number) => process.exit(code!))
    .on("error", (spawnError) => console.error(spawnError));

  console.log("Starting Main Process...");

  let args = ["-r", "ts-node/register/transpile-only", "."];

  if (process.env.MAIN_ARGS) {
    args = args.concat(...process.env.MAIN_ARGS.matchAll(/"[^"]+"|[^\s"]+/g));
  }

  return { preloadProcess, args };
}

export function killSubprocessesMiddleware(args: string[], childProcesses: ChildProcess[]) {
  spawn("electronmon", args, {
    shell: true,
    stdio: "inherit"
  })
    .on("close", (code: number) => {
      childProcesses.forEach((childProcess) => childProcess.kill());
      process.exit(code!);
    })
    .on("error", (spawnError) => console.error(spawnError));
}
