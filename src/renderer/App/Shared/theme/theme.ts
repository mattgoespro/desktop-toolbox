import { Theme, createTheme } from "@mui/material/styles";
import { createStyled } from "@mui/system";
import { SpacingArgument } from "@mui/system/createTheme/createSpacing";
import { components } from "./components";
import { palette } from "./palette";
import { typography } from "./typography";

export const theme: Theme = createTheme({
  ...palette,
  ...components,
  ...typography,
  spacing: (...args: SpacingArgument[]): string => {
    return args.map((value) => `${value}rem`).join();
  },
  shape: {
    borderRadius: 4
  }
});

export const createStyledComponent = createStyled({
  defaultTheme: theme
});
