import detectPort from "detect-port";

export async function checkPortUsage(port: number) {
  await new Promise<void>((resolve, reject) =>
    detectPort(
      {
        hostname: "localhost",
        port: port
      },
      (error, port) => {
        if (error != null) {
          console.error("error: port is in use");
          reject();
          return;
        }

        console.log(`port ${port} is available`);

        resolve();
      }
    )
  );
}
