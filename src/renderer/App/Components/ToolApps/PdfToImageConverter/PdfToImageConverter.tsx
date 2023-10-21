import { ConvertedFile } from "pdf2image";
import { PdfToImageEvent } from "ipc/events/pdf-to-image";
import { windowEventEmitter } from "ipc/window-event-emitter";
import styles from "./PdfToImageConverter.module.scss";

export default function PdfToImageConverter() {
  function sendFileSelectMessage() {
    windowEventEmitter.sendMessage("pdf-to-image");
  }

  windowEventEmitter.on("pdf-to-image", handleEvent);

  function handleEvent(event: PdfToImageEvent) {
    switch (event.type) {
      case "file-selected":
        handleFileSelected(event.payload);
        break;
    }
  }

  function handleFileSelected(file: ConvertedFile) {
    console.log(file);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles["file-select"]}></div>
    </div>
  );
}
