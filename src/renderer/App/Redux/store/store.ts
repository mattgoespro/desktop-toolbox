import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { RootAction, RootState, Services, createEpicMiddleware } from "redux-observable";
import { headingDefaultState } from "@Redux/Heading/reducer";
import { imageToIconDefaultState } from "@Redux/Tools/ImageToIconConverter/reducer";
import services from "@Redux/services";
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

export default store;
