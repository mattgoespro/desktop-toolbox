import { Theme, ThemeOptions } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine-sc";

export const typographyOf = (theme: Theme, element: keyof Theme["typography"]) => {
  return theme.typography[element] as CSSProperties;
};

export const typography: ThemeOptions["typography"] = (palette) => ({
  h1: {
    fontFamily: '"Source Code Pro", "Helvetica", "Arial", sans-serif',
    color: palette.text.primary
  },
  h2: {
    fontSize: "3rem",
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif'
  },
  h3: {
    fontSize: "2.4rem",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  h4: {
    fontSize: "2rem"
  },
  body1: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif'
  },
  body2: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif'
  },
  button: {
    fontFamily: '"Nunito", "Helvetica", "Arial", sans-serif'
  }
});
