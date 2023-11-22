import Link from "@mui/material/Link";
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from "react-router-dom";
import { StyledButton } from "../Button/Button";

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
  if (props.type === "link") {
    return <Link component={ReactRouterLink} {...props} />;
  }

  return (
    <StyledButton component={ReactRouterLink} {...props}>
      {props.children}
    </StyledButton>
  );
}
