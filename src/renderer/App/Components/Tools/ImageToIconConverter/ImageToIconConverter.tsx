import { uuid } from "generate-uuid";
import { FlexContainer } from "src/renderer/App/Shared/Components/FlexContainer/FlexContainer";
import { ConvertRow } from "./ConvertRow/ConvertRow";

export function ImageToIconConverter() {
  return (
    <FlexContainer
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="lightGrey"
    >
      {Array.of(1, 2, 3, 4, 5).map(() => {
        return <ConvertRow key={uuid()}></ConvertRow>;
      })}
    </FlexContainer>
  );
}
