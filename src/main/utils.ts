export function inDevMode(): boolean {
  return (process.env.NODE_ENV ?? "development") === "development";
}
