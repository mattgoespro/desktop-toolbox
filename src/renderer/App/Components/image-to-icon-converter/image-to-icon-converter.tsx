import { Button } from "@mui/material";
import { useState } from "react";
import { ImageFileSelectedReplyEvent } from "main/app/communication/image-to-icon/events";
import { windowEventEmitter } from "main/app/communication/shared/window-event-emitter";
import { SelectImageFileEvent } from "renderer/app/communication/image-to-icon/events";
import { uuid } from "@shared/utils/generate-uuid";
import { ConvertRow } from "./convert-row/convert-row";
import { ItemBatchRadioGroup, ItemBatchSize } from "./image-to-icon-item-batch-radio-group";
import Box from "@mui/material/Box";

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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      maxWidth="md"
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
    </Box>
  );
}
