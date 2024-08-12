import { Epic, RootAction, RootState, ofType } from "redux-observable";
import { map } from "rxjs";
import { ImageFileSelectedReplyEvent } from "main/app/communication/image-to-icon/events";
import { windowEventEmitter } from "main/app/communication/shared/window-event-emitter";
import store from "renderer/app/redux/store/store";
import { ConvertImageEvent, SelectImageFileEvent } from "../../communication/image-to-icon/events";
import {
  BEGIN_IMAGE_CONVERSION,
  setFailedImageConversion,
  setCompletedImageConversion,
  queuePendingImageConversion,
  SELECT_IMAGE_FILE_TO_CONVERT
} from "./actions";

export const selectImageFileToConvertEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  _state$
) =>
  action$.pipe(
    ofType(SELECT_IMAGE_FILE_TO_CONVERT),
    map((action) => {
      console.log("selectImageFileToConvertEpic", action);

      return new Promise((resolve) => {
        windowEventEmitter.emitEvent<SelectImageFileEvent>({
          channel: "image-to-icon",
          event: "select-file",
          payload: {
            id: action.payload.id
          }
        });

        windowEventEmitter.handleEvent<ImageFileSelectedReplyEvent>("image-to-icon", (response) => {
          if (response.payload.id !== action.payload.id) {
            resolve(undefined);
            return;
          }

          if (response.payload?.filePath == null) {
            resolve(null);
            return;
          }

          resolve(store.dispatch(queuePendingImageConversion(action.payload.imagePath)));
        });
      });
    })
  );

export const beginImageConversionEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  _state$
) =>
  action$.pipe(
    ofType(BEGIN_IMAGE_CONVERSION),
    map(async (action) => {
      const imagePath = action.payload.imagePath;

      const imageFileSelectedPromise = new Promise<{ imagePath: string } | undefined>(
        (resolve, reject) => {
          windowEventEmitter.emitEvent<ConvertImageEvent>({
            channel: "image-to-icon",
            event: "convert-image",
            payload: {
              id: imagePath,
              filePath: imagePath
            }
          });

          windowEventEmitter.handleEvent<ImageFileSelectedReplyEvent>(
            "image-to-icon",
            (response) => {
              if (response.payload?.filePath !== imagePath) {
                resolve(undefined);
                return;
              }

              if (response.payload?.filePath == null) {
                resolve(null);
                return;
              }

              if (response.payload.filePath === "failed") {
                reject();
                return;
              }
            }
          );
        }
      );

      const imageFileSelected = await imageFileSelectedPromise;

      if (imageFileSelected === undefined) {
        return;
      }

      if (imageFileSelected === null) {
        return store.dispatch(setFailedImageConversion(imagePath));
      }

      return store.dispatch(
        setCompletedImageConversion(imagePath, (await imageFileSelectedPromise).imagePath)
      );
    })
  );
