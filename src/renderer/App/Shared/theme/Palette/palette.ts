import { PaletteOptions } from "@mui/material";

export const palette = (): PaletteOptions => {
  const grey = {
    "50": "#f7f7f7",
    "100": "#eeeded",
    "200": "#e6e6e6",
    "300": "#dddddd",
    "400": "#c4c4c4",
    "500": "#a5a5a5",
    "600": "#797979",
    "700": "#555555",
    "800": "#2e2e2e",
    "900": "#181818"
  };

  return {
    mode: "light",
    text: {
      primary: grey["900"],
      secondary: "#6b7280",
      disabled: grey["500"]
    },
    primary: {
      main: "#388e3c"
    },
    secondary: {
      main: "#0091ea"
    },
    info: {
      main: "#81c784"
    },
    success: {
      main: "#7cb342"
    },
    background: {
      default: grey["800"],
      paper: grey["100"],
      lightGrey: grey["200"],
      grey: grey["400"],
      darkGrey: grey["800"],
      blackGrey: grey["900"]
    }
  };
};
