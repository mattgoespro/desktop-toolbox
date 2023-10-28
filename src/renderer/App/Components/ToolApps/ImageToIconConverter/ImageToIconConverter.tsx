import { windowEventEmitter } from "ipc/window-event-emitter";
import { FileSelectedEvent, SelectFileEvent } from "main/ipc/events/image-to-icon";
import { Button } from "shared/Button/Button";
import styles from "./ImageToIconConverter.module.scss";
import { useState } from "react";

export function ImageToIconConverter() {
  const [imagePath, setImagePath] = useState<string>(null);

  const sendSelectFileEvent = () => {
    windowEventEmitter.emitEvent<SelectFileEvent>({
      channel: "image-to-icon",
      event: "select-file"
    });

    windowEventEmitter.handleEvent<FileSelectedEvent>("image-to-icon", (response) => {
      console.log(response.payload.filePath);
      setImagePath(response.payload.filePath);
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["select-image"]}>
        <label>Select an image</label>
        <Button type="primary" onClick={sendSelectFileEvent}>
          Open file
        </Button>
      </div>
      <div className={styles["image-display-frame"]}>
        <img src={imagePath} alt="selected-image" />
      </div>
    </div>
  );
}
