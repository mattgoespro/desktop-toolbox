import { FlexBox } from "../../../shared/components/flex-box";
import { uuid } from "../../../shared/utils/uuid";
import { ConvertRow } from "./convert-row/convert-row";

export function ImageToIconConverter() {
  return (
    <FlexBox
      direction="column"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={0.5}
    >
      {Array.of(1, 2, 3, 4, 5).map(() => {
        return <ConvertRow key={uuid()}></ConvertRow>;
      })}
    </FlexBox>
  );
}
