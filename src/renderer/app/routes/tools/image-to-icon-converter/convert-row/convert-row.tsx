import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../../..//store/hooks";
import { useState } from "react";
import { ImageToIconChannel } from "@shared/ipc/channels";
import { FileSelectedResponseEvent, SelectFileActionEvent } from "@shared/ipc/events/common-events";
import { windowEventEmitter } from "@shared/framework/window-event-emitter";
import { FlexBox } from "../../../../shared/components/flex-box";

export function ConvertRow() {
  const [selectedImagePath, _setSelectedImagePath] = useState<string | null>(null);
  const _dispatch = useAppDispatch();

  const sendSelectImageEvent = () => {
    windowEventEmitter.emitEvent<SelectFileActionEvent<ImageToIconChannel>>({
      channel: "image-to-icon",
      event: "select-file"
    });
    windowEventEmitter.handleEvent<FileSelectedResponseEvent<ImageToIconChannel>>(
      "image-to-icon",
      (event) => {
        if (event.event === "file-selected") {
          _setSelectedImagePath(event.payload.filePath);
          // TODO: Dispatch an action to update the store with the selected image path
          // dispatch({});
        }
      }
    );
  };

  return (
    <FlexBox
      direction="column"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {(selectedImagePath && <Typography variant="body2">{selectedImagePath}</Typography>) ?? (
        <Typography variant="body1">Select an image</Typography>
      )}
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
