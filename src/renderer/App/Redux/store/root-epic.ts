import { combineEpics } from "redux-observable";
import {
  selectImageFileToConvertEpic,
  beginImageConversionEpic
} from "../image-to-icon-converter/epics";

export const rootEpic = combineEpics(selectImageFileToConvertEpic, beginImageConversionEpic);
