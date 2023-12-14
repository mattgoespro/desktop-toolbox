import { createSelector } from "reselect";
import { HeadingState } from "./reducer";

export const getTitle = (state: HeadingState) => state.title;

export const getSubtitle = (state: HeadingState) => state.subtitle;

export const getHeading = createSelector(getTitle, getSubtitle, (title, subtitle) => {
  return {
    title,
    subtitle
  };
});
