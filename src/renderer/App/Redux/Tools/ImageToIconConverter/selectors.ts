import { createSelector } from "reselect";
import { ImageToIconState } from "./reducer";

export const selectPendingImageConversionPaths = (state: ImageToIconState) =>
  state.pendingImageConversionPaths;

export const selectCompletedImageConversionPaths = (state: ImageToIconState) =>
  state.completedImageConversionPaths;

export const selectFailedImageConversionPaths = (state: ImageToIconState) =>
  state.failedImageConversionPaths;

export const getHeading = createSelector(
  selectPendingImageConversionPaths,
  selectCompletedImageConversionPaths,
  selectFailedImageConversionPaths,
  (pending, completed, failed) => {
    return {
      pending,
      completed,
      failed
    };
  }
);
