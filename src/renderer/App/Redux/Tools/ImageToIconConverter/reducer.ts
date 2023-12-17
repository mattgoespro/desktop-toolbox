import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import * as ImageToIconActions from "./actions";

export type ImageToIconState = {
  pendingImageConversionPaths: string[];
  completedImageConversionPaths: string[];
  failedImageConversionPaths: string[];
};

export const imageToIconDefaultState: ImageToIconState = {
  pendingImageConversionPaths: [],
  completedImageConversionPaths: [],
  failedImageConversionPaths: []
};

export type ImageToIconAction = ActionType<typeof ImageToIconActions>;

export default combineReducers<ImageToIconState, ImageToIconAction>({
  pendingImageConversionPaths: (state, action) => {
    switch (action.type) {
      case getType(ImageToIconActions.addPendingImageConversion):
        return [...state, action.payload.imagePath];
      default:
        return imageToIconDefaultState.pendingImageConversionPaths;
    }
  },
  completedImageConversionPaths: (state, action) => {
    switch (action.type) {
      case getType(ImageToIconActions.addCompletedImageConversion):
        return [...state, action.payload.imagePath];
      default:
        return imageToIconDefaultState.completedImageConversionPaths;
    }
  },
  failedImageConversionPaths: (state, action) => {
    switch (action.type) {
      case getType(ImageToIconActions.addFailedImageConversion):
        state.push(action.payload.imagePath);
        return state;
      default:
        return imageToIconDefaultState.failedImageConversionPaths;
    }
  }
});
