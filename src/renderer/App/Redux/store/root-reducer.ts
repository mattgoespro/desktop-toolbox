import { combineReducers } from "redux";
import headingReducer from "../Heading/reducer";

const rootReducer = combineReducers({
  heading: headingReducer
});

export default rootReducer;
