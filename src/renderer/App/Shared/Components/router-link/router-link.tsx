import { createStyled } from "@theme/theme";

export type RouterLinkProps = {
  variant?: "primary" | "secondary";
};

export const RouterLink = createStyled("a", {
  name: "RouterLink",
  label: "RouterLink",
  overridesResolver: (props, styles) => {
    return {
      ...styles,
      "&:hover": {
        textDecoration: "underline"
      }
    };
  }
});
