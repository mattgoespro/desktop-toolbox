import { Container, ContainerProps } from "@mui/material";
import { CSSInterpolation } from "@mui/system";
import { createStyledComponent } from "../../Theme/theme";

export type FlexContainerProps = ContainerProps & {
  direction?: "row" | "column";
  centerHorizontal?: boolean;
  centerVertical?: boolean;
};

export const FlexContainer = createStyledComponent(Container, {
  name: "FlexContainer",
  label: "FlexContainer",
  slot: "Root",
  overridesResolver(props: FlexContainerProps, styles) {
    let overrideStyle: CSSInterpolation = { display: "flex" };

    if (props.direction === "row") {
      overrideStyle = {
        ...overrideStyle,
        flexDirection: "row"
      };
    }

    if (props.direction === "column") {
      overrideStyle = {
        ...overrideStyle,
        flexDirection: "column"
      };
    }

    if (props.centerHorizontal) {
      overrideStyle = {
        ...overrideStyle,
        justifyContent: "center"
      };
    }

    if (props.centerVertical) {
      overrideStyle = {
        ...overrideStyle,
        alignItems: "center"
      };
    }

    return [styles, overrideStyle];
  }
})<FlexContainerProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));
