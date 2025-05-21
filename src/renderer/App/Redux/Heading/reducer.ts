import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";
import * as HeadingActions from "./actions";

export type HeadingState = {
  title: string;
  subtitle?: string;
};

export type HeadingAction = ActionType<typeof HeadingActions>;

export const headingStateReducer: Reducer<HeadingState, HeadingAction> = (state, action) => {
  switch (action.type) {
    case getType(HeadingActions.setHeadingTitle):
      return {
        ...state,
        title: action.payload.title
      };
    case getType(HeadingActions.setHeadingSubtitle):
      return {
        ...state,
        subtitle: action.payload.subtitle
      };
    default:
      return state;
  }
};
