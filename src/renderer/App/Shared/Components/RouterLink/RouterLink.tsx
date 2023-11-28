import Link from "@mui/material/Link";
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from "react-router-dom";
import { Button } from "../Button/Button";

export type RouterLinkBaseProps = Pick<ReactRouterLinkProps, "to" | "relative" | "children"> & {
  type: "link" | "button";
};

export type RouterLinkButtonProps = Omit<RouterLinkBaseProps, "type"> & {
  type: "button";
  children?: JSX.Element[];
  name?: string;
  onClick?: () => void;
};

type RouterLinkProps = RouterLinkBaseProps | RouterLinkButtonProps;

export function RouterLink(props: RouterLinkProps) {
  const { type = "link" } = props;

  switch (type) {
    case "button":
      return (
        <Button component={ReactRouterLink} {...props}>
          {"name" in props ? props.name : undefined}
        </Button>
      );
    case "link":
      return <Link component={ReactRouterLink} {...props} />;
    default:
      throw new Error(`Unknown RouterLink type: ${type}`);
  }
}
