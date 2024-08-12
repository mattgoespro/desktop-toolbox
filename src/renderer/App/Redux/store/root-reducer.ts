import { combineReducers } from "redux";
import headingReducer from "../heading/reducer";
import imageToIconReducer from "../image-to-icon-converter/reducer";

const rootReducer = combineReducers({
  heading: headingReducer,
  imageToIcon: imageToIconReducer
});

export default rootReducer;
