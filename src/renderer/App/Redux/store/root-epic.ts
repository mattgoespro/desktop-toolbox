import { combineEpics } from "redux-observable";
import * as headerEpics from "../Heading/epics";
import * as imageToIconEpics from "../Tools/ImageToIconConverter/epics";

export default combineEpics(...Object.values(headerEpics), ...Object.values(imageToIconEpics));
