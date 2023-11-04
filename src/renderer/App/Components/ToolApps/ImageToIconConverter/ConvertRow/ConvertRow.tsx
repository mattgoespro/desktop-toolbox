import { Button } from "renderer/shared/Button/Button";
import styles from "./ConvertRow.module.scss";
import { windowEventEmitter } from "main/shared/window-event-emitter";
import {
  ConvertImageEvent,
  ImageFileSelectedEvent,
  SelectImageFileEvent
} from "main/apps/image-to-icon/events";
import { useState } from "react";

export function ConvertRow() {
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);
  const [convertedIconPath, setConvertedIconPath] = useState<string | null>(null);

  const sendSelectImageEvent = () => {
    windowEventEmitter.emitEvent<SelectImageFileEvent>({
      channel: "image-to-icon",
      event: "select-file"
    });

    windowEventEmitter.handleEvent<ImageFileSelectedEvent>("image-to-icon", (response) => {
      if (response.payload?.filePath == null) {
        return;
      }

      setSelectedImagePath(response.payload.filePath);
    });
  };

  const sendConvertImageEvent = () => {
    windowEventEmitter.emitEvent<ConvertImageEvent>({
      channel: "image-to-icon",
      event: "convert-image",
      payload: {
        filePath: selectedImagePath
      }
    });

    windowEventEmitter.handleEvent<ImageFileSelectedEvent>("image-to-icon", (response) => {
      setConvertedIconPath(response.payload.filePath);
    });
  };
  return (
    <div className={styles["convert-row"]}>
      {(selectedImagePath && <label>{selectedImagePath}</label>) ?? (
        <label className={styles["select-label"]}>Select an image</label>
      )}
      <div className={styles["action-buttons"]}>
        <Button
          className={styles["action-button"]}
          type="secondary"
          onClick={sendSelectImageEvent}
          size="small"
        >
          Select
        </Button>
        <Button
          className={styles["action-button"]}
          type="primary"
          size="small"
          onClick={sendConvertImageEvent}
          disabled={selectedImagePath == null}
        >
          Convert
        </Button>
      </div>
    </div>
  );
}
