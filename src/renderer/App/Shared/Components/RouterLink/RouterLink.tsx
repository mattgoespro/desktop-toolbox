import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from "react-router-dom";
import { Button } from "../Button/Button";

export type RouterLinkBaseProps = Pick<ReactRouterLinkProps, "to" | "relative" | "children"> & {
  type: "link" | "button";
};

export type RouterLinkButtonProps = Omit<RouterLinkBaseProps, "type"> & {
  type: "button";
  children?: JSX.Element[];
  title?: string;
  onClick?: () => void;
};

type RouterLinkProps = RouterLinkBaseProps | RouterLinkButtonProps;

export function RouterLink(props: RouterLinkProps) {
  const { type = "link", children, ...rest } = props;
  const isTextNode = !Array.isArray(children) && typeof children[0] === "string";

  switch (type) {
    case "button":
      return (
        <Button component={ReactRouterLink} {...rest}>
          {isTextNode ? <Typography variant="button">{children}</Typography> : children}
        </Button>
      );
    case "link":
      return <Link component={ReactRouterLink} {...rest} />;
    default:
      throw new Error(`Unknown RouterLink type: ${type}`);
  }
}
