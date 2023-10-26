import { compose, configureStore } from "@reduxjs/toolkit";
import titleReducer from "./Title/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    titleReducer
  },
  enhancers: composeEnhancers()
});

export default store;
