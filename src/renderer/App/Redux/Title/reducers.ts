import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TitleState {
  title: string;
  subtitle?: string;
}

type TitleStateReducers = "setTitle";
type TitleReducers = Record<TitleStateReducers, CaseReducer<TitleState, PayloadAction<TitleState>>>;

export const titleSlice = createSlice<TitleState, TitleReducers>({
  name: "title",
  initialState: {
    title: "Dashboard"
  },
  reducers: {
    setTitle: (state, action) => ({
      ...state,
      title: action.payload.title || "",
      subtitle: action.payload.subtitle
    })
  }
});

export default titleSlice.reducer;
