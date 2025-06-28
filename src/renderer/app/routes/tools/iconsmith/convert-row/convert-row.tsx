import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../../../store/hooks";
import { useState } from "react";
import { ImageToIconChannel } from "@shared/ipc/channels";
import { SelectFileActionEvent } from "@shared/ipc/events/common-events";
import { windowEventEmitter } from "@shared/framework/window-event-emitter";
import { FlexBox } from "../../../../shared/components/flex-box";
import { fileSelected } from "../../../../store/slices/iconsmith.slice";
import { ConvertImageActionEvent } from "@shared/ipc/events/main-events";
import { ImageFileSelectedReplyEvent } from "@shared/ipc/events/image-to-icon/renderer-events";
import AlertPopup from "src/renderer/app/shared/components/alert-popup";

export function ConvertRow() {
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  windowEventEmitter.handleEvent<ImageFileSelectedReplyEvent>("image-to-icon", (event) => {
    if (event.event === "file-selected") {
      if (event.payload.error != null) {
        setError(event.payload.error.message);
        setSelectedImagePath(null);
        dispatch(fileSelected(null));
        return;
      }

      setSelectedImagePath(event.payload.filePath);
      dispatch(fileSelected(event.payload.filePath));
    }
  });

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
    <FlexBox direction="row" justify="center" align="center" sx={{ width: "100%", gap: 1 }}>
      {(selectedImagePath && <Typography variant="body2">{selectedImagePath}</Typography>) ?? (
        <Typography variant="body1" sx={{ flexBasis: "50%" }}>
          Select an image
        </Typography>
      )}

      <Button variant="outlined" onClick={onSelectImageFile} size="small" sx={{ flexBasis: "15%" }}>
        Select
      </Button>
      <Button
        variant="text"
        size="small"
        onClick={onConvertImage}
        disabled={selectedImagePath == null}
        sx={{ flexBasis: "15%" }}
      >
        Convert
      </Button>
      {error && <AlertPopup />}
    </FlexBox>
  );
}
