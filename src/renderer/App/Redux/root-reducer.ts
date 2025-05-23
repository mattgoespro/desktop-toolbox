import { combineReducers } from "redux";
import { headingStateReducer } from "./heading/reducer";

// Reducers are added here
const rootReducer = combineReducers({
  heading: headingStateReducer
});

export default rootReducer;
