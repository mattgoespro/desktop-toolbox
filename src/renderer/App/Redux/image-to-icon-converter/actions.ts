import { createAction } from "typesafe-actions";

const SELECT_IMAGE_FILE_TO_CONVERT = "image-to-icon/SELECT_IMAGE_TO_CONVERT";
const QUEUE_PENDING_IMAGE_CONVERSION = "image-to-icon/QUEUE_PENDING_IMAGE_CONVERSION";
const BEGIN_IMAGE_CONVERSION = "image-to-icon/BEGIN_IMAGE_CONVERSION";
const SET_COMPLETED_IMAGE_CONVERSION = "image-to-icon/SET_COMPLETED_IMAGE_CONVERSION";
const SET_FAILED_IMAGE_CONVERSION = "image-to-icon/SET_FAILED_IMAGE_CONVERSION";

export const selectImageFileToConvert = createAction(SELECT_IMAGE_FILE_TO_CONVERT)();

export const queuePendingImageConversion = createAction(
  QUEUE_PENDING_IMAGE_CONVERSION,
  (imagePath: string) => ({
    imagePath
  })
)<{
  imagePath: string;
}>();

export const beginImageConversion = createAction(BEGIN_IMAGE_CONVERSION, (imagePath: string) => ({
  imagePath
}))<{ imagePath: string }>();

export const setCompletedImageConversion = createAction(
  SET_COMPLETED_IMAGE_CONVERSION,
  (imagePath: string, outputIconPath: string) => ({
    imagePath,
    outputIconPath
  })
)();

export const setFailedImageConversion = createAction(
  SET_FAILED_IMAGE_CONVERSION,
  (imagePath: string) => ({
    imagePath
  })
)();
