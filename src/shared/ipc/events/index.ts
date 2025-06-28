import { ImageToIconMainEvents } from "./main-events";
import { ImageToIconRendererEvents } from "./image-to-icon/renderer-events";

export type ImageToIconEvents = ImageToIconMainEvents | ImageToIconRendererEvents;
