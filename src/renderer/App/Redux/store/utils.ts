import { compose } from "redux";
console.log("in dev mode", process.env.NODE_ENV === "development");
export const composeEnhancers =
  process.env.NODE_ENV === "development" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
