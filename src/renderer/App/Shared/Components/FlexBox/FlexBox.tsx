import { Box, BoxProps } from "@mui/material";

export type FlexBoxProps = BoxProps & {
  direction?: "row" | "column";
  centerHorizontal?: boolean;
  centerVertical?: boolean;
};

export function FlexBox(props: BoxProps & FlexBoxProps) {
  const { direction = "row", centerHorizontal = true, centerVertical = true, ...rest } = props;

  return (
    <Box
      {...rest}
      sx={{
        display: "flex",
        flexDirection: direction,
        justifyContent: centerHorizontal ? "center" : undefined,
        alignItems: centerVertical ? "center" : undefined
      }}
    />
  );
}
