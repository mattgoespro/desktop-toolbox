import { combineEpics } from "redux-observable";
import {
  selectImageFileToConvertEpic,
  beginImageConversionEpic
} from "@Redux/Tools/ImageToIconConverter/epics";

export const rootEpic = combineEpics(selectImageFileToConvertEpic, beginImageConversionEpic);
