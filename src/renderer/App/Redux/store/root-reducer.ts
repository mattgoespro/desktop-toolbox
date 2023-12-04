import { combineReducers } from "redux";
import headingReducer from "../Heading/reducer";
import { routerReducer } from "./redux-router";

const rootReducer = combineReducers({
  router: routerReducer,
  heading: headingReducer
});

export default rootReducer;
