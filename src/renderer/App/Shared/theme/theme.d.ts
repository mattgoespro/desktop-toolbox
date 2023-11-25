import Button from "@mui/material/Button";

declare module "@mui/material/styles" {
  interface Theme {}

  interface Components {
    Heading?: unknown;
    Subheading?: unknown;
  }

  interface ButtonPropsVariantOverrides {
    link: true;
    icon: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    link: true;
    icon: true;
  }
}
