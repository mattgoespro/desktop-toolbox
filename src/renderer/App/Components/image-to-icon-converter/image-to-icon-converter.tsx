import { Button } from "@mui/material";
import { useState } from "react";
import { FlexContainer } from "@shared/components/flex-container/flex-container";
import { ImageFileSelectedReplyEvent } from "main/app/communication/image-to-icon/events";
import { windowEventEmitter } from "main/app/communication/shared/window-event-emitter";
import { SelectImageFileEvent } from "renderer/app/communication/image-to-icon/events";
import { uuid } from "renderer/app/shared/utils/generate-uuid";
import { ConvertRow } from "./convert-row/convert-row";
import { ItemBatchRadioGroup, ItemBatchSize } from "./image-to-icon-item-batch-radio-group";

export function ImageToIconConverter() {
  const [count, setCount] = useState<ItemBatchSize>("single");
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);

  windowEventEmitter.handleEvent<ImageFileSelectedReplyEvent>("image-to-icon", (event) => {
    if (event.event === "file-selected") {
      setSelectedImagePath(event.payload.filePath);
    }
  });

  function selectImageFile(): void {
    windowEventEmitter.emitEvent<SelectImageFileEvent>({
      channel: "image-to-icon",
      event: "select-file"
    });
  }

  return (
    <FlexContainer
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      backgroundColor="lightGrey"
    >
      <ItemBatchRadioGroup onChange={(count) => setCount(count)}></ItemBatchRadioGroup>
      {(count === "single" && (
        <>
          <Button variant="outlined" onClick={() => selectImageFile()} size="small">
            Select
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              selectImageFile();
            }}
            disabled={selectedImagePath == null}
          >
            Convert
          </Button>
        </>
      )) ||
        Array.of(1, 2, 3, 4, 5).map(() => {
          return <ConvertRow key={uuid()}></ConvertRow>;
        })}
    </FlexContainer>
  );
}
