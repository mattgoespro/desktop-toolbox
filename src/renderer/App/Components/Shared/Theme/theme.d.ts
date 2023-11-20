import {
  ComponentNameToClassKey,
  ComponentsOverrides,
  PaletteOptions,
  Theme
} from "@mui/material/styles";
import { FlexBoxProps } from "../FlexBox/FlexBox";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    palette?: Partial<PaletteOptions>;
  }

  interface ComponentsPropsList {
    FlexBox: FlexBoxProps;
  }

  interface ComponentsProps {
    Box: FlexBoxProps;
  }

  type InheritClassKeys<T extends ComponentNameToClassKey> = {
    [Key in keyof T]: T[Key];
  };

  type CustomComponent<Props, InheritClassKey extends keyof ComponentsOverrides> = {
    variants?: unknown;
    defaultProps?: Props;
    styleOverrides?: ComponentsOverrides<Theme>[InheritClassKey];
  };

  interface Components {
    FlexBox?: CustomComponent<FlexBoxProps, "MuiContainer">;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    link: true;
  }
}
