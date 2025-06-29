import { Typography, Button } from "@mui/material";
import { windowEventEmitter } from "@shared/framework/window-event-emitter";
import { IconSmithChannel } from "@shared/ipc/channels";
import { SelectFileActionEvent } from "@shared/ipc/events/common-events";
import { ConvertImageToIconActionEvent } from "@shared/ipc/events/image-to-icon/main-events";
import {
  ImageConvertedReplyEvent,
  ImageFileSelectedReplyEvent
} from "@shared/ipc/events/image-to-icon/renderer-events";
import { useState } from "react";
import { AlertPopup } from "src/renderer/app/shared/components/alert-popup";
import { FlexBox } from "src/renderer/app/shared/components/flex-box";
import { useAppDispatch } from "src/renderer/app/store/hooks";
import { fileSelected } from "src/renderer/app/store/slices/iconsmith.slice";

export function IconSmith() {
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    severity?: "error" | "warning" | "info" | "success";
  }>(null);

  const dispatch = useAppDispatch();

  windowEventEmitter.handleEvent<ImageFileSelectedReplyEvent | ImageConvertedReplyEvent>(
    "iconsmith",
    (event) => {
      switch (event.event) {
        case "file-selected":
          {
            if (event.payload.error != null) {
              setAlert({
                message: event.payload.error.message,
                severity: "error"
              });
              setSelectedImagePath(null);
              dispatch(fileSelected(null));
              return;
            }

            setSelectedImagePath(event.payload.filePath);
            dispatch(fileSelected(event.payload.filePath));
          }
          break;
        case "image-converted": {
          if (event.payload.error != null) {
            setAlert({
              message: event.payload.error.message,
              severity: "error"
            });
            return;
          }

          setAlert({
            message: `Icon successfully created at ${event.payload.outputIconPath}`,
            severity: "success"
          });
          dispatch(fileSelected(null));
          break;
        }
      }
    }
  );

  function onSelectImageFile() {
    windowEventEmitter.emitEvent<SelectFileActionEvent<IconSmithChannel>>({
      channel: "iconsmith",
      event: "select-file"
    });
  }

  function onConvertImage() {
    windowEventEmitter.emitEvent<ConvertImageToIconActionEvent>({
      channel: "iconsmith",
      event: "convert-image-to-icon",
      payload: {
        imageFilePath: selectedImagePath
      }
    });
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
      {alert && (
        <AlertPopup
          severity={alert.severity ?? "error"}
          message={alert.message}
          onClose={() => {
            setAlert(null);
          }}
        />
      )}
    </FlexBox>
  );
}
