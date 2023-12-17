import { createAction } from "typesafe-actions";
import {
  ADD_COMPLETED_IMAGE_CONVERSION,
  ADD_FAILED_IMAGE_CONVERSION,
  ADD_PENDING_IMAGE_CONVERSION
} from "./constants";

export const addPendingImageConversion = createAction(
  ADD_PENDING_IMAGE_CONVERSION,
  (imagePath: string) => ({
    imagePath
  })
)<{ imagePath: string }>();

export const addCompletedImageConversion = createAction(
  ADD_COMPLETED_IMAGE_CONVERSION,
  (imagePath: string) => ({
    imagePath
  })
)<{ imagePath: string }>();

export const addFailedImageConversion = createAction(
  ADD_FAILED_IMAGE_CONVERSION,
  (imagePath: string) => ({
    imagePath
  })
)<{ imagePath: string }>();
