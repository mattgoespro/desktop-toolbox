import { configureStore } from "@reduxjs/toolkit";
import titleReducer from "./Title/reducers";

const store = configureStore({
  reducer: {
    titleReducer
  }
});

export default store;
