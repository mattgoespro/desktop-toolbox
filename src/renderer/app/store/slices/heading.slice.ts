import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HeadingState = {
  title: string;
  subtitle?: string;
};

const initialState: HeadingState = {
  title: "Dashboard",
  subtitle: ""
};

const headingSlice = createSlice({
  name: "heading",
  initialState,
  reducers: {
    headingUpdated: {
      reducer: (state, action: PayloadAction<HeadingState>) => {
        state = action.payload;
      },
      prepare: (title: string, subtitle?: string) => {
        return {
          payload: {
            title,
            subtitle: subtitle ?? ""
          }
        };
      }
    }
  }
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { headingUpdated } = headingSlice.actions;

// Export the slice reducer as the default export
export default headingSlice.reducer;
