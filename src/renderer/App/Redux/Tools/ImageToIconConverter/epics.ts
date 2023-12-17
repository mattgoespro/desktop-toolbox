import { Epic, RootAction, RootState } from "redux-observable";
import { map } from "rxjs";
import { ignoreElements, filter } from "rxjs/operators";
import { isOfType } from "typesafe-actions";
import { SelectImageFileEvent, ImageFileSelectedEvent } from "main/apps/image-to-icon/events";
import { windowEventEmitter } from "main/shared/window-event-emitter";
import { ADD_PENDING_IMAGE_CONVERSION } from "./constants";

export const convertImageToIcon: Epic<RootAction, RootAction, RootState> = (action$, _state$) =>
  action$.pipe(
    filter(isOfType(ADD_PENDING_IMAGE_CONVERSION)),
    map((action) => {
      console.log(action);
      return new Promise((resolve) => {
        windowEventEmitter.emitEvent<SelectImageFileEvent>({
          channel: "image-to-icon",
          event: "select-file"
        });

        windowEventEmitter.handleEvent<ImageFileSelectedEvent>("image-to-icon", (response) => {
          if (response.payload?.filePath == null) {
            return;
          }

          resolve(response.payload.filePath);
        });
      });
    }),
    ignoreElements()
  );
