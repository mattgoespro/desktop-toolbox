import { createAction } from "typesafe-actions";

const SET_HEADING_TITLE = "heading/set-title";

export const setHeadingTitle = createAction(
  SET_HEADING_TITLE,
  (title: string, subtitle?: string) => ({
    title,
    subtitle: subtitle ?? ""
  })
)<{ title: string; subtitle: string }>();

export type HeadingAction = ReturnType<typeof setHeadingTitle>;
