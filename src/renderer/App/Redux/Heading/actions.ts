import { createAction } from "typesafe-actions";

const SET_HEADING_TITLE = "heading/SET_TITLE";
const SET_HEADING_SUBTITLE = "heading/SET_SUBTITLE";

export const setHeadingTitle = createAction(SET_HEADING_TITLE, (title: string) => ({
  title
}))<{ title: string }>();
export const setHeadingSubtitle = createAction(SET_HEADING_SUBTITLE, (subtitle: string) => ({
  subtitle
}))<{ subtitle: string }>();
