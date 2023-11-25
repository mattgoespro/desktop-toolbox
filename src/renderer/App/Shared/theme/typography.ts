import { Theme, ThemeOptions } from "@mui/material";

export const typographyOf = (theme: Theme, element: keyof Theme["typography"]) => {
  return theme.typography[element];
};

export const typography: ThemeOptions["typography"] = (palette) => ({
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
});
