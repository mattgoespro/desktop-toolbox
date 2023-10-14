import { ConvertedFile } from "pdf2image";

export type PdfToImageEventType = "file-selected";

export interface PdfToImageEvent {
  type: PdfToImageEventType;
  payload: ConvertedFile;
  error?: Error;
}
