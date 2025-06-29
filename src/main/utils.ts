export function inDebugMode() {
  return process.env.NODE_ENV === "development";
}
