import { Box, BoxProps, styled } from "@mui/material";

export type FlexBoxProps = BoxProps & {
  direction?: "row" | "column";
  center?: boolean;
};

export const FlexBox = styled(Box, {
  name: "FlexBox",
  overridesResolver(props, styles) {
    if (props.direction === "row") {
      return [styles.root, { display: "flex", flexDirection: "row" }];
    }

    if (props.direction === "column") {
      return [styles.root, { display: "flex", flexDirection: "column" }];
    }

    if (props.center) {
      styles.root["align-items"] = "center";
      return styles.root;
    }

    return styles.root;
  }
})<FlexBoxProps>(({ theme }) => ({
  display: "flex",
  bgcolor: theme.palette.background.paper
})) as typeof Box;
