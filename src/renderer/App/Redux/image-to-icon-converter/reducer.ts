import { Reducer } from "redux";
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

export const imageToIconStateReducer: Reducer<ImageToIconState, ImageToIconAction> = (
  state,
  action
) => {
  switch (action.type) {
    case getType(ImageToIconActions.queuePendingImageConversion):
      return {
        ...state,
        imageConversionQueue: [
          ...state.imageConversionQueue,
          {
            state: "pending",
            imagePath: action.payload.imagePath
          }
        ]
      };
    case getType(ImageToIconActions.beginImageConversion):
      return {
        ...state,
        imageConversionQueue: state.imageConversionQueue.map((conversion) => {
          if (conversion.imagePath === action.payload.imagePath) {
            return {
              ...conversion,
              state: "pending"
            };
          }
          return conversion;
        })
      };
    default:
      return state;
  }
};
