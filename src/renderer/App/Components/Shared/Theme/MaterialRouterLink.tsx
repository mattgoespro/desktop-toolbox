import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from "react-router-dom";

export type RouterLinkProps = Pick<ReactRouterLinkProps, "to" | "relative" | "children"> & {
  type: "link" | "button";
};

export type RouterLinkButtonProps = Omit<RouterLinkProps, "type"> & {
  type: "button";
  onClick?: () => void;
};

export function RouterLink(props: RouterLinkProps | RouterLinkButtonProps) {
  if (props.type === "link") {
    return <Link component={ReactRouterLink} {...props} />;
  }

  return <Button variant="link" component={ReactRouterLink} {...props} />;
}
