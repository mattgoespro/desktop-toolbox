export function inDevMode(): boolean {
  const mode = process.env.NODE_ENV;

  if (mode === "development") {
    console.warn("No mode has been set when checking if in development mode. Assuming true");
    return true;
  }

  return false;
}
