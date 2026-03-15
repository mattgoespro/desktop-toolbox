import { Typography, Button } from "@mui/material";
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
import Paper from "@mui/material/Paper";
import { windowEventEmitter } from "../../../shared/window-event-emitter";

export default function IconSmith() {
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
    <Paper
      variant="outlined"
      sx={{
        maxWidth: 520,
        p: "1.25rem"
      }}
    >
      <FlexBox direction="column" justify="center" align="stretch" gap={0.75}>
        <Typography
          variant="body2"
          sx={{
            px: "0.75rem",
            py: "0.5rem",
            borderRadius: "3px",
            backgroundColor: "#111113",
            border: "1px solid #2a2a2f",
            fontFamily: "'Source Code Pro', monospace",
            fontSize: "0.8em",
            color: selectedImagePath ? "#eaeaec" : "#55555c",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {selectedImagePath ?? "No image selected"}
        </Typography>

        <FlexBox direction="row" justify="flex-end" align="center" gap={0.5}>
          <Button variant="outlined" onClick={onSelectImageFile} size="small">
            Select Image
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={onConvertImage}
            disabled={selectedImagePath == null}
          >
            Convert
          </Button>
        </FlexBox>
      </FlexBox>

      {alert && (
        <AlertPopup
          severity={alert.severity ?? "error"}
          message={alert.message}
          onClose={() => {
            setAlert(null);
          }}
        />
      )}
    </Paper>
  );
}
