import { ImageFileSelectedEvent, SelectImageFileEvent } from "main/apps/image-to-icon/events";
import styles from "./ImageToIconConverter.module.scss";
import { useState } from "react";
import { Button } from "shared/Button/Button";
import { windowEventEmitter } from "main/shared/window-event-emitter";

export function ImageToIconConverter() {
  const [imagePath, setImagePath] = useState<string>(null);

  const sendSelectFileEvent = () => {
    windowEventEmitter.emitEvent<SelectImageFileEvent>({
      channel: "image-to-icon",
      event: "select-file"
    });

    windowEventEmitter.handleEvent<ImageFileSelectedEvent>("image-to-icon", (response) => {
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
        {(imagePath && <img className={styles["image"]} src={imagePath} />) || (
          <p>No image selected</p>
        )}
      </div>
    </div>
  );
}
