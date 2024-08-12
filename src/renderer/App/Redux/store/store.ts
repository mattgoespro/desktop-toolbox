import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { RootAction, RootState, Services, createEpicMiddleware } from "redux-observable";
import services from "renderer/app/redux/services";
import { headingDefaultState } from "../heading/reducer";
import { imageToIconDefaultState } from "../image-to-icon-converter/reducer";
import { rootEpic } from "./root-epic";
import rootReducer from "./root-reducer";

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, Services>({
  dependencies: services
});

const middlewares = [epicMiddleware];

const preloadedState = {
  heading: headingDefaultState,
  imageToIcon: imageToIconDefaultState
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  enhancers: [applyMiddleware(...middlewares)]
});

epicMiddleware.run(rootEpic);

export default store;
