import { Button } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootAction, RootState } from "redux-observable";
import {
  setCompletedImageConversion,
  beginImageConversion,
  setFailedImageConversion,
  queuePendingImageConversion,
  selectImageFileToConvert
} from "@redux/image-to-icon-converter/actions";
import { windowEventEmitter } from "main/app/communication/shared/window-event-emitter";
import { SelectImageFileEvent } from "../../../communication/image-to-icon/events";
import { Label } from "@mui/icons-material";
import Box from "@mui/material/Box";

const mapStateToProps = (state: RootState) => ({
  imageConversionQueue: state.imageToIcon.imageConversionQueue
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      queuePendingImageConversion,
      beginImageConversion,
      selectImageFileToConvert,
      setCompletedImageConversion,
      setFailedImageConversion
    },
    dispatch
  );

type ConvertRowProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    imageConversionQueue: string[];
  };

const ConvertRowComponent = (props: ConvertRowProps) => {
  const [selectedImagePath, _setSelectedImagePath] = useState<string | null>(null);
  // const [, setConvertedIconPath] = useState<string | null>(null);

  const sendSelectImageEvent = () => {
    windowEventEmitter.emitEvent<SelectImageFileEvent>({
      channel: "image-to-icon",
      event: "select-file"
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;" }}
    >
      {(selectedImagePath && <Label>{selectedImagePath}</Label>) ?? <Label>Select an image</Label>}
      <Box display="flex" flexDirection="row" justifyContent="end" alignItems="center">
        <Button variant="outlined" onClick={() => props.selectImageFileToConvert()} size="small">
          Select
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            const actionPayload = props.beginImageConversion(selectedImagePath);
            console.log("ConvertRowComponent -> actionPayload", actionPayload);
          }}
          disabled={selectedImagePath == null}
        >
          Convert
        </Button>
      </Box>
    </Box>
  );
};

export const ConvertRow = connect(mapStateToProps, mapDispatchToProps)(ConvertRowComponent);
