declare module "@mui/material/styles" {
  interface Theme {}

  interface ThemeOptions {}

  interface Components {
    Heading?: unknown;
    Subheading?: unknown;
    StyledButton?: unknown;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    link: true;
    icon: true;
  }
}
