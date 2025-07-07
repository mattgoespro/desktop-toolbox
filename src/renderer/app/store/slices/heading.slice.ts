import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadPersistedState } from "../utils/persistence";

export type HeadingState = {
  heading?: string;
};

// Load persisted state
const persistedState = loadPersistedState();

const initialState: HeadingState = {
  heading: persistedState?.heading?.heading || undefined
};

const headingSlice = createSlice({
  name: "heading",
  initialState,
  reducers: {
    headingChanged: (state, action: PayloadAction<string | undefined, "headingChanged">) => {
      state.heading = action.payload;
    }
  }
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { headingChanged } = headingSlice.actions;

// Export the slice reducer as the default export
export default headingSlice.reducer;
