import { Container, ContainerProps } from "@mui/material";
import { StandardLonghandProperties } from "csstype";
import { createStyledComponent } from "../../Theme/theme";

export type FlexContainerProps = ContainerProps & {
  flexDirection?: "row" | "column";
  justifyContent?: StandardLonghandProperties["justifyContent"];
  alignItems?: StandardLonghandProperties["alignItems"];
};

export const FlexContainer = createStyledComponent(Container, {
  name: "FlexContainer",
  label: "FlexContainer",
  slot: "Root",
  shouldForwardProp(propName: keyof FlexContainerProps) {
    return (
      propName !== "flexDirection" && propName !== "justifyContent" && propName !== "alignItems"
    );
  }
})<FlexContainerProps>((options) => {
  const { theme, flexDirection, justifyContent, alignItems } = options;

  return {
    display: "flex",
    flexDirection,
    justifyContent,
    alignItems,
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    padding: theme.spacing()
  };
});
