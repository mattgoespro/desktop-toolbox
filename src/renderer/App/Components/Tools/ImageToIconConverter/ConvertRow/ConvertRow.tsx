import { Button } from "@mui/material";
import { useState } from "react";
import { Label } from "@Components/Label/Label";
import {
  ConvertImageEvent,
  ImageFileSelectedEvent,
  SelectImageFileEvent
} from "main/apps/image-to-icon/events";
import { windowEventEmitter } from "main/shared/window-event-emitter";
import { FlexContainer } from "src/renderer/App/Shared/Components/FlexContainer/FlexContainer";

export function ConvertRow() {
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);
  const [, setConvertedIconPath] = useState<string | null>(null);

  const sendSelectImageEvent = () => {
    windowEventEmitter.emitEvent<SelectImageFileEvent>({
      channel: "image-to-icon",
      event: "select-file"
    });

    windowEventEmitter.handleEvent<ImageFileSelectedEvent>("image-to-icon", (response) => {
      if (response.payload?.filePath == null) {
        return;
      }

      setSelectedImagePath(response.payload.filePath);
    });
  };

  const sendConvertImageEvent = () => {
    windowEventEmitter.emitEvent<ConvertImageEvent>({
      channel: "image-to-icon",
      event: "convert-image",
      payload: {
        filePath: selectedImagePath
      }
    });

    windowEventEmitter.handleEvent<ImageFileSelectedEvent>("image-to-icon", (response) => {
      setConvertedIconPath(response.payload.filePath);
    });
  };
  return (
    <FlexContainer
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="paper"
      sx={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;" }}
    >
      {(selectedImagePath && <Label>{selectedImagePath}</Label>) ?? <Label>Select an image</Label>}
      <FlexContainer
        flexDirection="row"
        justifyContent="end"
        alignItems="center"
        backgroundColor="paper"
      >
        <Button variant="outlined" onClick={sendSelectImageEvent} size="small">
          Select
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={sendConvertImageEvent}
          disabled={selectedImagePath == null}
        >
          Convert
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
}
