import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../../../store/hooks";
import { useState } from "react";
import { ImageToIconChannel } from "@shared/ipc/channels";
import { FileSelectedResponseEvent, SelectFileActionEvent } from "@shared/ipc/events/common-events";
import { windowEventEmitter } from "@shared/framework/window-event-emitter";
import { FlexBox } from "../../../../shared/components/flex-box";
import { fileSelected } from "../../../../store/slices/iconsmith.slice";
import { ConvertImageActionEvent } from "@shared/ipc/events/main-events";

export function ConvertRow() {
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  windowEventEmitter.handleEvent<FileSelectedResponseEvent<ImageToIconChannel>>(
    "image-to-icon",
    (event) => {
      console.log("Received file selected event in ConvertRow", event);
      if (event.event === "file-selected") {
        setSelectedImagePath(event.payload.filePath);
        dispatch(fileSelected(event.payload.filePath));
      }
    }
  );

  function onSelectImageFile() {
    windowEventEmitter.emitEvent<SelectFileActionEvent<ImageToIconChannel>>({
      channel: "image-to-icon",
      event: "select-file"
    });
  }

  function onConvertImage() {
    windowEventEmitter.emitEvent<ConvertImageActionEvent>({
      channel: "image-to-icon",
      event: "convert-image",
      payload: {
        id: selectedImagePath,
        filePath: selectedImagePath
      }
    });
    // Here you would typically dispatch an action to convert the image
    // For example:
    // dispatch(convertImage(selectedImagePath));
  }

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
        <Button variant="outlined" onClick={onSelectImageFile} size="small">
          Select
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={onConvertImage}
          disabled={selectedImagePath == null}
        >
          Convert
        </Button>
      </FlexBox>
    </FlexBox>
  );
}
