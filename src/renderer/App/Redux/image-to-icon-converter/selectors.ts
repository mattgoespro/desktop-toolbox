import { ImageToIconState } from "./reducer";

export const selectImageConversions = (state: ImageToIconState) => state.imageConversionQueue;
