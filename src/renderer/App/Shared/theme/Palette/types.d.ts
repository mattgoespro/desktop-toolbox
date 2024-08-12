import {
  PaletteOptions as MuiPaletteOptions,
  TypeBackground as MuiTypeBackground
} from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground extends MuiTypeBackground {
    default: string;
    paper: string;
    lightGrey: string;
    grey: string;
    darkGrey: string;
    blackGrey: string;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    background?: Partial<TypeBackground>;
  }
}
