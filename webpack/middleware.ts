import { ChildProcess, spawn } from "child_process";

export function startPreloadTaskMiddleware() {
  return {
    preloadProcess: spawn("webpack", ["--config", "webpack/config.preload.dev.ts"], {
      shell: true,
      env: {
        NODE_ENV: "development",
        TS_NODE_TRANSPILE_ONLY: "true"
      },
      stdio: "inherit"
    })
      .on("close", (code: number) => process.exit(code!))
      .on("error", (spawnError) => console.error(spawnError)),
    args: ["ts-node/register/transpile-only", ".", "--inspect=5858", "--remote-debugging-port=9223"]
  };
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
