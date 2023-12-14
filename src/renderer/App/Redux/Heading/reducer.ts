import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import * as HeadingActions from "./actions";

export type HeadingState = {
  title: string;
  subtitle?: string;
};

export const headingDefaultState: HeadingState = {
  title: "Dashboard",
  subtitle: null
};

export type HeadingAction = ActionType<typeof HeadingActions>;

export default combineReducers<HeadingState, HeadingAction>({
  title: (state, action) => {
    switch (action.type) {
      case getType(HeadingActions.setHeadingTitle):
        state = action.payload.title;
        return state;
      default:
        return headingDefaultState.title;
    }
  },
  subtitle: (state, action) => {
    switch (action.type) {
      case getType(HeadingActions.setHeadingSubtitle):
        state = action.payload.subtitle;
        return state;
      default:
        return headingDefaultState.subtitle;
    }
  }
});
