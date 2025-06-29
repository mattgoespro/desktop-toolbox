import { IconSmithActionEvents } from "./image-to-icon/main-events";
import { ImageToIconRendererEvents } from "./image-to-icon/renderer-events";

export type IconSmithEvents = IconSmithActionEvents | ImageToIconRendererEvents;
