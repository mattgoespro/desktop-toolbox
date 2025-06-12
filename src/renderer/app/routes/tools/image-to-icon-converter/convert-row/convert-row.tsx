import { Label } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../..//store/hooks";
import { useState } from "react";
import { ImageToIconChannel } from "@shared/ipc/channels";
import { SelectFileActionEvent } from "@shared/ipc/events/common-events";
import { windowEventEmitter } from "@shared/framework/window-event-emitter";
import { FlexBox } from "../../../../shared/components/flex-box";

export function ConvertRow() {
  const [selectedImagePath, _setSelectedImagePath] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const sendSelectImageEvent = () => {
    windowEventEmitter.emitEvent<SelectFileActionEvent<ImageToIconChannel>>({
      channel: "image-to-icon",
      event: "select-file"
    });
  };

  return (
    <FlexBox
      direction="column"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {(selectedImagePath && <Label>{selectedImagePath}</Label>) ?? <Label>Select an image</Label>}
      <FlexBox direction="row" justifyContent="end" alignItems="center">
        <Button variant="outlined" onClick={() => sendSelectImageEvent()} size="small">
          Select
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            console.log("ConvertRowComponent -> actionPayload");
          }}
          disabled={selectedImagePath == null}
        >
          Convert
        </Button>
      </FlexBox>
    </FlexBox>
  );
}
