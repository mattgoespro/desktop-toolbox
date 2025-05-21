import { combineReducers } from "redux";
import { headingStateReducer } from "../heading/reducer";
import { imageToIconStateReducer } from "../image-to-icon-converter/reducer";

const rootReducer = combineReducers({
  heading: headingStateReducer,
  imageToIcon: imageToIconStateReducer
});

export default rootReducer;
