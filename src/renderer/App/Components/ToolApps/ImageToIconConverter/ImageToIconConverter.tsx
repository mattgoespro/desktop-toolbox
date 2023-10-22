import { windowEventEmitter } from "ipc/window-event-emitter";
import { FileSelectedEvent, SelectFileEvent } from "main/ipc/events/image-to-icon";
import { Button } from "shared/Button/Button";
import styles from "./ImageToIconConverter.module.scss";

export function ImageToIconConverter() {
  const sendSelectFileEvent = () => {
    windowEventEmitter.emitEvent<SelectFileEvent>("image-to-icon", "select-file");
  };

  const handleFileSelect = (filePath) => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles["select-image"]}>
        <label>Select an image</label>
        <Button
          type="primary"
          onClick={() => {
            sendSelectFileEvent();

            windowEventEmitter.handleEvent<FileSelectedEvent>("image-to-icon", (event) => {
              handleFileSelect(event.filePath);
            });
          }}
        >
          Open file
        </Button>
      </div>
    </div>
  );
}
