import { createTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createSpacing } from "@mui/system";
import MuiCreateStyled from "@mui/system/createStyled";

export const theme = createTheme({
  palette: {
    mode: "dark",
    common: {
      black: "#1f1f1f",
      white: "#f0f0f0",
    },
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    error: {
      main: "#f44336",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    text: {
      primary: "#cccccc",
      secondary: "#96a4b3",
      disabled: "#838383",
    },
    background: {
      default: "#101010",
      paper: "#1f1f1f",
    },
  },
  typography: (palette) => ({
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    h1: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: "3.125em",
      fontWeight: 500,
      lineHeight: 1,
      color: palette.text.primary,
      margin: "1rem 0.875rem 0.5rem",
    },
    h2: {
      fontFamily: "Inter, sans-serif",
      fontSize: "1.5em",
      fontWeight: 200,
      color: palette.text.secondary,
      margin: "0.25rem 0.875rem",
    },
    h3: {
      fontFamily: "Inter, sans-serif",
      fontSize: "1.25em",
      fontWeight: 500,
      color: palette.text.secondary,
      margin: "0.5rem",
    },
    button: {
      fontFamily: "Nunito Sans, sans-serif",
      fontSize: "0.875em",
      fontWeight: "normal",
      color: palette.common.white,
      textTransform: "uppercase",
    },
    body1: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "1.25em",
      fontWeight: "normal",
      color: palette.text.primary,
    },
    body2: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "1.125em",
      fontWeight: "normal",
      color: palette.text.primary,
    },
    caption: {
      fontFamily: "Inter, sans-serif",
      fontSize: "1em",
      fontWeight: "normal",
      color: palette.text.secondary,
    },
  }),
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
        size: "small",
      },
      styleOverrides: {
        root: {
          margin: "0.5rem",
        },
      },
      // variants: [
      //   {
      //     props: { variant: "contained", color: "primary", size: "small" },
      //     style: {
      //       backgroundColor: "#1976d2",
      //       color: "#fff",
      //       borderRadius: "4px",
      //       padding: "6px 16px",
      //       maxWidth: "5rem",
      //       "&:hover": {
      //         backgroundColor: "#0055aa",
      //         borderColor: "#0055aa",
      //         boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
      //       },
      //     },
      //   },
      //   {
      //     props: { variant: "outlined", color: "primary" },
      //     style: {
      //       borderColor: "#1976d2",
      //       color: "#1976d2",
      //       "&:hover": {
      //         backgroundColor: "#0055aa",
      //         borderColor: "#0055aa",
      //       },
      //     },
      //   },
      // ],
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
        color: "primary",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.caption,
          fontWeight: 300,
          minWidth: "16rem",
        }),
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        size: "small",
        color: "primary",
        renderInput: (params) => {
          return <TextField {...params} variant="outlined" color="primary" size="small" />;
        },
      },
    },
    MuiTabs: {
      defaultProps: {
        variant: "fullWidth",
        textColor: "primary",
        indicatorColor: "primary",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
  },
  spacing: createSpacing((value: number | string) => {
    if (typeof value === "number") {
      return `${value}rem`;
    }

    return value;
  }),
  shape: {
    borderRadius: 4,
  },
});

export const createStyled = MuiCreateStyled({
  defaultTheme: theme,
});
