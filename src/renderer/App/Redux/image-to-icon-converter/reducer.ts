import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import * as ImageToIconActions from "./actions";

export type ImageConversion = {
  state: "pending" | "completed" | "failed";
  imagePath: string;
  outputIconPath?: string;
};

export type ImageToIconState = {
  imageConversionQueue: ImageConversion[];
};

export const imageToIconDefaultState: ImageToIconState = {
  imageConversionQueue: []
};

export type ImageToIconAction = ActionType<typeof ImageToIconActions>;

export default combineReducers<ImageToIconState, ImageToIconAction>({
  imageConversionQueue: (state, action) => {
    switch (action.type) {
      case getType(ImageToIconActions.queuePendingImageConversion):
        if (
          state.some((imageConversion) => imageConversion.imagePath === action.payload.imagePath)
        ) {
          throw new Error(`Image conversion for ${action.payload.imagePath} is already queued.`);
        }

        // TODO: Handle case when output path already exists (image output name collision)

        return [
          ...state,
          {
            state: "pending",
            imagePath: action.payload.imagePath
          }
        ];
      case getType(ImageToIconActions.setCompletedImageConversion):
        return state.map((imageConversion) => {
          if (imageConversion.imagePath !== action.payload.imagePath) {
            return imageConversion;
          }

          return {
            ...imageConversion,
            state: "completed",
            outputIconPath: action.payload.outputIconPath
          };
        });
      case getType(ImageToIconActions.setFailedImageConversion):
        return state.map((imageConversion) => {
          if (imageConversion.imagePath !== action.payload.imagePath) {
            return imageConversion;
          }

          return {
            ...imageConversion,
            state: "failed"
          };
        });
      default:
        return imageToIconDefaultState.imageConversionQueue;
    }
  }
});
