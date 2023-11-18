import { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    palette?: Partial<PaletteOptions>;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    link: true;
  }
}

declare module "@mui/material/ListItem" {
  interface ListItemBaseProps {
    contained?: boolean;
  }
}