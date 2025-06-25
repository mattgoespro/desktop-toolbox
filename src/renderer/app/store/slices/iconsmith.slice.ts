import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IconSmithState = {
  filePath?: string;
};

const initialState: IconSmithState = {
  filePath: undefined
};

const iconSmithSlice = createSlice({
  name: "iconSmith",
  initialState,
  reducers: {
    fileSelected: (state, action: PayloadAction<string, "fileSelected">) => {
      state.filePath = action.payload;
    }
  }
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { fileSelected } = iconSmithSlice.actions;

// Export the slice reducer as the default export
export default iconSmithSlice.reducer;
