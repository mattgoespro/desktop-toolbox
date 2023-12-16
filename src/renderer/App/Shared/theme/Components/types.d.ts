import { Theme } from "@mui/material";
import { ComponentsOverrides, ComponentsProps, ComponentsVariants } from "@mui/material/styles";
import { RouterLinkBaseProps } from "../../Components/RouterLink/RouterLink";

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
    Sidebar?: ComponentsProps["MuiStack"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    link: true;
    icon: true;
  }
}

export {};
