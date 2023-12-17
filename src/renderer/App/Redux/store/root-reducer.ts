import { combineReducers } from "redux";
import headingReducer from "../Heading/reducer";
import imageToIconReducer from "../Tools/ImageToIconConverter/reducer";

const rootReducer = combineReducers({
  heading: headingReducer,
  imageToIcon: imageToIconReducer
});

export default rootReducer;
