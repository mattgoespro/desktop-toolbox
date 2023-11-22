import generateUuid from "src/renderer/App/Utils/gen-uuid";
import { FlexBox } from "../../../Shared/Components/FlexBox/FlexBox";
import { Label } from "../../../Shared/Components/Label/Label";
import { ConvertRow } from "./ConvertRow/ConvertRow";
import styles from "./ImageToIconConverter.module.scss";

export function ImageToIconConverter() {
  return (
    <FlexBox direction="column">
      <div className={styles["select-image"]}>
        <Label>Select an image file</Label>
      </div>
      <div className={styles["convert-rows"]}>
        {Array.of(1, 2, 3, 4, 5).map(() => {
          return <ConvertRow key={generateUuid()}></ConvertRow>;
        })}
      </div>
    </FlexBox>
  );
}
