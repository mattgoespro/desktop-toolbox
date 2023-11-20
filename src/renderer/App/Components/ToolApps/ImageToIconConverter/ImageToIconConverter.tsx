import generateUuid from "src/renderer/App/Utils/gen-uuid";
import { ConvertRow } from "./ConvertRow/ConvertRow";
import styles from "./ImageToIconConverter.module.scss";

export function ImageToIconConverter() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["select-image"]}>
        <label>Select an image</label>
      </div>
      <div className={styles["convert-rows"]}>
        {Array.of(1, 2, 3, 4, 5).map(() => {
          return <ConvertRow key={generateUuid()}></ConvertRow>;
        })}
      </div>
    </div>
  );
}
