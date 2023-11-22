import { Theme, createTheme } from "@mui/material/styles";
import { createStyled } from "@mui/system";
import { SpacingArgument } from "@mui/system/createTheme/createSpacing";

export const theme: Theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#111827",
      secondary: "#6b7280",
      disabled: "#9ca3af"
    },
    primary: {
      main: "#3f51b5",
      dark: "#303f9f"
    },
    secondary: {
      main: "#f50057"
    },
    grey: {
      "50": "#f9fafb",
      "100": "#f3f4f6",
      "200": "#e5e7eb",
      "300": "#d1d5db",
      "400": "#9ca3af",
      "500": "#6b7280",
      "600": "#4b5563",
      "700": "#374151",
      "800": "#1f2937",
      "900": "#111827"
    },
    background: {
      default: "#f5f5f5",
      paper: "#fafafa"
    }
  },
  spacing: (...args: SpacingArgument[]): string => {
    return args.map((value) => `${value}rem`).join();
  },
  shape: {
    borderRadius: 4
  },
  direction: "ltr",
  unstable_sxConfig: undefined,
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    up: () => null,
    down: () => null,
    between: () => null,
    not: () => null,
    only: () => null,
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    },
    unit: "rem"
  },
  components: {},
  typography(palette) {
    return {
      h1: {
        fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 64,
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: palette.grey[900],
        lineHeight: 1.18
      },
      h2: {
        fontSize: 38,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 300,
        lineHeight: 1.18,
        letterSpacing: "-0.02em"
      },
      h3: {
        fontFamily: '"Source Code Pro", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 26,
        fontWeight: 100,
        lineHeight: 0.81,
        letterSpacing: "-0.04em"
      },
      h4: {
        fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 1.5,
        letterSpacing: "-0.04em"
      },
      h5: {
        fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 1.5,
        letterSpacing: "-0.05em"
      },
      h6: {
        fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeight: 700,
        lineHeight: 1.5,
        letterSpacing: "-0.05em"
      },
      button: {
        fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: 1.7,
        letterSpacing: "-0.01em"
      },
      body1: {
        fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.7,
        letterSpacing: "-0.01em"
      }
    };
  }
});

export const styled = createStyled({
  defaultTheme: theme
});
