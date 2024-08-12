import { createStyledComponent } from "@shared/theme/theme";

export type RouterLinkProps = {
  variant?: "primary" | "secondary";
};

export const RouterLink = createStyledComponent("a", {
  name: "RouterLink",
  label: "RouterLink",
  overridesResolver: (props, styles) => {
    const { variant } = props;

    return {
      ...styles,
      "&:hover": {
        textDecoration: "underline"
      }
    };
  }
});
