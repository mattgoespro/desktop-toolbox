import { Epic, RootAction, RootState, Services } from "redux-observable";
import { ignoreElements, filter } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { SET_HEADING_TITLE } from "./constants";

export const logAddAction: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  _state$,
  { log: _logger }
) => action$.pipe(filter(isOfType(SET_HEADING_TITLE)), ignoreElements());
