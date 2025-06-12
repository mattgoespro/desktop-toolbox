import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import { createStyled } from "../theme";

export const Link = createStyled(MuiLink, {
  name: "Link",
  slot: "Root"
})<MuiLinkProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline"
  },
  "&:active": {
    textDecoration: "underline"
  }
}));
