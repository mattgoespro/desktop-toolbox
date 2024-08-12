import { Theme } from "@mui/material";
import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from "@mui/material/styles";
import { AppBarProps } from "../../components/app-bar/app-bar";
import { RouterLinkBaseProps } from "../../components/router-link/router-link";

declare module "@mui/material/styles" {
  interface Components {
    Heading?: React.HTMLAttributes<"h1">;
    Subheading?: React.HTMLAttributes<"h2">;
    Link?: RouterLinkBaseProps;
    FlexContainer?: {
      defaultProps?: ComponentsProps["MuiContainer"];
      styleOverrides?: ComponentsOverrides<Theme>["MuiContainer"];
      variants?: ComponentsVariants["MuiContainer"];
    };
    AppBar?: AppBarProps;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    link: true;
    icon: true;
  }
}

export {};
