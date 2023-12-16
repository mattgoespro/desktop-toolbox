import { Theme, createTheme } from "@mui/material/styles";
import { createStyled } from "@mui/system";
import { SpacingArgument } from "@mui/system/createTheme/createSpacing";
import { components } from "./Components/components";
import { palette } from "./Palette/palette";
import { typography } from "./Typography/typography";

export const theme: Theme = createTheme({
  palette: palette(),
  components,
  typography,
  spacing: (...args: SpacingArgument[]): string => {
    if (args.length === 0) {
      return "0rem";
    }

    return args.map((value) => (value == null ? "0rem" : `${value}rem`)).join();
  },
  shape: {
    borderRadius: 4
  }
});

export const createStyledComponent = createStyled({
  defaultTheme: theme
});
