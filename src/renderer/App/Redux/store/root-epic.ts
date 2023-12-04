import { combineEpics } from "redux-observable";
import * as headerEpics from "../Heading/epics";

export default combineEpics(...Object.values(headerEpics));
