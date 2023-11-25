import { FlexBox } from "@Components/FlexBox/FlexBox";
import { uuid } from "generate-uuid";
import { ConvertRow } from "./ConvertRow/ConvertRow";

export function ImageToIconConverter() {
  return (
    <FlexBox direction="column">
      {Array.of(1, 2, 3, 4, 5).map(() => {
        return <ConvertRow key={uuid()}></ConvertRow>;
      })}
    </FlexBox>
  );
}
