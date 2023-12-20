import { Button } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RootAction, RootState } from "redux-observable";
import { FlexContainer } from "@Components/FlexContainer/FlexContainer";
import { Label } from "@Components/Label/Label";
import {
  setCompletedImageConversion,
  beginImageConversion,
  setFailedImageConversion
} from "@Redux/Tools/ImageToIconConverter/actions";
import { windowEventEmitter } from "main/app/communication/shared/window-event-emitter";
import {
  // RendererConvertImageEvent,
  SelectImageFileEvent
} from "../../../../Communication/image-to-icon/events";

const mapStateToProps = (state: RootState) => ({
  imageConversionQueue: state.imageToIcon.imageConversionQueue
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      queuePendingImageConversion: beginImageConversion,
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
        <Button variant="outlined" onClick={() => sendSelectImageEvent()} size="small">
          Select
        </Button>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            const actionPayload = props.queuePendingImageConversion(selectedImagePath);
            console.log("ConvertRowComponent -> actionPayload", actionPayload);
          }}
          disabled={selectedImagePath == null}
        >
          Convert
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
};

export const ConvertRow = connect(mapStateToProps, mapDispatchToProps)(ConvertRowComponent);
