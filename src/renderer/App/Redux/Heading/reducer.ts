import { Reducer } from "redux";
import { HeadingAction } from "./actions";

export type HeadingState = {
  title: string;
  subtitle?: string;
};

export const headingStateReducer: Reducer<HeadingState, HeadingAction> = (state, action) => {
  switch (action.type) {
    case "heading/set-title":
      return {
        ...state,
        title: action.payload.title
      };
    default:
      return state;
  }
};
