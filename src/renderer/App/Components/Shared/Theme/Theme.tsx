import { blue } from "@mui/material/colors";
import { Theme, ThemeOptions, createTheme } from "@mui/material/styles";
import { SpacingArgument } from "@mui/system/createTheme/createSpacing";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5"
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
  typography: {
    h1: {
      fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 64,
      fontWeight: 700,
      letterSpacing: "0.02em"
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
    button: {
      fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif',
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 1.7,
      letterSpacing: "-0.01em"
    }
  },
  spacing: (...args: SpacingArgument[]): string => {
    if (args.length === 2) {
      const [topBottom, rightLeft] = args;
      return `${topBottom}px ${rightLeft}px`;
    }

    if (args.length === 4) {
      const [top, right, bottom, left] = args;
      return `${top}px ${right}px ${bottom}px ${left}px`;
    }

    if (args.length === 1) {
      const [value] = args;
      return `${value}px`;
    }

    return "";
  },
  shape: {
    borderRadius: 4
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "link" },
          style: {
            color: blue[900],
            backgroundColor: "transparent",
            height: "20px",
            "&:hover": {
              color: "primary",
              backgroundColor: "transparent",
              rippleVisible: false
            }
          }
        }
      ]
    }
  }
};

export const theme: Theme = createTheme(themeOptions);
