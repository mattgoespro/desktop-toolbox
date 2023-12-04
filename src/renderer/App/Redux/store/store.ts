import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { RootAction, RootState, Services, createEpicMiddleware } from "redux-observable";
import services from "@Redux/services";
import { routerMiddleware } from "./redux-router";
import rootReducer from "./root-reducer";
import { composeEnhancers } from "./utils";

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, Services>({
  dependencies: services
});

const middlewares = [epicMiddleware, routerMiddleware];
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const initialState = {
  heading: {
    title: "Hello World",
    subtitle: "Welcome to the world of Redux"
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  enhancers: [enhancer]
});

export default store;
