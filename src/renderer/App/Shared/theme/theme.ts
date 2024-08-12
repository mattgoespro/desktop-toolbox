import { Theme, createTheme } from "@mui/material/styles";
import { createStyled } from "@mui/system";
import { SpacingArgument } from "@mui/system/createTheme/createSpacing";
import { components } from "./components/components";
import { palette } from "./palette/palette";
import { typography } from "./typography/typography";

export const theme: Theme = createTheme({
  components,
  palette: palette(),
  typography,
  shape: {
    borderRadius: 4
  },
  spacing: (...args: SpacingArgument[]): string => {
    if (args.length === 0) {
      return "0 rem";
    }

    return args.map((value) => (value == null ? "0 rem" : `${value} rem`)).join();
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  direction: "ltr",
  shadows: [
    "none",
    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
    "0 0 0 1px rgba(0, 0, 0, 0.05)",
    "0 0 0 1px rgba(0, 0, 0, 0.1)",
    "0 0 0 1px rgba(0, 0, 0, 0.2)",
    "0 0 0 1px rgba(0, 0, 0, 0.3)",
    "0 0 0 1px rgba(0, 0, 0, 0.4)",
    "0 0 0 1px rgba(0, 0, 0, 0.5)",
    "0 0 0 1px rgba(0, 0, 0, 0.6)",
    "0 0 0 1px rgba(0, 0, 0, 0.7)",
    "0 0 0 1px rgba(0, 0, 0, 0.8)",
    "0 0 0 1px rgba(0, 0, 0, 0.9)",
    "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 2px 1px rgba(0, 0, 0, 0.1)",
    "0 0 0 1px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.1)",
    "0 0 0 1px rgba(0, 0, 0, 0.3), 0 6px 6px 1px rgba(0, 0, 0, 0.1)",
    "0 0 0 1px rgba(0, 0, 0, 0.4), 0 8px 8px 1px rgba(0, 0, 0, 0.1)",
    "0 0 0 1px rgba(0, 0, 0, 0.5), 0 10px 10px 1px rgba(0, 0, 0, 0.1)",
    "0 0 0 1px rgba(0, 0, 0, 0.6), 0 12px 12px 1px rgba(0, 0, 0, 0.1)",
    "0 0 0 1px rgba(0, 0, 0, 0.7), 0 14px 14px 1px rgba(0, 0, 0, 0.1)",
    "0 0 0 1px rgba(0, 0, 0, 0.8), 0 16px 16px 1px rgba(0, 0, 0, 0.1)"
  ],
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    }
  }
});

export const createStyledComponent = createStyled({
  defaultTheme: theme
});
