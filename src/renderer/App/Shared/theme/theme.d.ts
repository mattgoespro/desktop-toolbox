import _Button from "@mui/material/Button";
import { Heading, Subheading } from "../Components/Heading/Heading";
import { Link } from "../Components/Link/Link";
import { FlexContainer } from "../Components/FlexContainer/FlexContainer";
import { ComponentsProps } from "@mui/material/styles";
import { RouterLinkBaseProps } from "../Components/RouterLink/RouterLink";

declare module "@mui/material/styles" {
  interface Theme {}

  interface Components {
    Heading?: React.HTMLAttributes<"h1">;
    Subheading?: React.HTMLAttributes<"h2">;
    Link?: RouterLinkBaseProps;
    FlexContainer?: ComponentsProps["MuiContainer"];
    Sidebar?: ComponentsProps["MuiStack"];
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

declare module "@mui/system/Container" {}
