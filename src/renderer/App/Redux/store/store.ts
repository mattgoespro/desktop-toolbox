import { configureStore } from "@reduxjs/toolkit";
import { imageToIconDefaultState } from "../image-to-icon-converter/reducer";
import rootReducer from "./root-reducer";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    heading: {
      title: "Image to Icon Converter",
      subtitle: "Convert images to icons"
    },
    imageToIcon: imageToIconDefaultState
  },
  devTools: process.env.NODE_ENV === "development"
});

export default store;
