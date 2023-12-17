import { Button } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
// import { Outlet } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { RootAction, RootState } from "redux-observable";
import { FlexContainer } from "@Components/FlexContainer/FlexContainer";
import { Label } from "@Components/Label/Label";
import { addCompletedImageConversion } from "@Redux/Tools/ImageToIconConverter/actions";
import {
  // ConvertImageEvent,
  ImageFileSelectedEvent,
  SelectImageFileEvent
} from "main/apps/image-to-icon/events";
import { windowEventEmitter } from "main/shared/window-event-emitter";

const mapStateToProps = (state: RootState) => ({
  title: state.heading.title,
  subtitle: state.heading.subtitle
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      addCompletedImageConversion
    },
    dispatch
  );

type ConvertRowProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    title: string;
    subtitle?: string;
  };

const ConvertRowComponent = (props: ConvertRowProps) => {
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);
  // const [, setConvertedIconPath] = useState<string | null>(null);

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

  // const sendConvertImageEvent = () => {
  //   windowEventEmitter.emitEvent<ConvertImageEvent>({
  //     channel: "image-to-icon",
  //     event: "convert-image",
  //     payload: {
  //       filePath: selectedImagePath
  //     }
  //   });

  //   windowEventEmitter.handleEvent<ImageFileSelectedEvent>("image-to-icon", (response) => {
  //     setConvertedIconPath(response.payload.filePath);
  //   });
  // };

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
          onClick={() => props.addCompletedImageConversion(selectedImagePath ?? "")}
          disabled={selectedImagePath == null}
        >
          Convert
        </Button>
      </FlexContainer>
    </FlexContainer>
  );
};

export const ConvertRow = connect(mapStateToProps, mapDispatchToProps)(ConvertRowComponent);
