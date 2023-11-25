import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  ButtonOwnProps,
  Theme
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { CSSProperties } from "styled-components";
import { createStyledComponent } from "../../Theme/theme";
import { typographyOf } from "../../Theme/typography";

type ButtonProps = { variant: "link" | "icon" };
type ButtonVariants = ButtonOwnProps["variant"] extends OverridableStringUnion<
  infer Defaults extends string,
  infer Overrides
>
  ? Defaults | ButtonProps["variant"] | Overrides
  : never;

const styleButtonVariant = (theme: Theme, variant: ButtonVariants) => {
  const typography = typographyOf(theme, "button") as CSSProperties;
  let style: Record<string, unknown> = { ...typography };

  switch (variant) {
    case "link":
      style = {
        ...style,
        color: "inherit",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "transparent"
        }
      };
      break;
    case "icon":
      style = {
        ...style,
        padding: 0,
        minWidth: 0,
        width: 40,
        height: 40,
        borderRadius: "50%",
        "&:hover": {
          backgroundColor: "transparent"
        }
      };
      break;
    case "contained":
      style = {
        ...style,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1, 2),
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: theme.palette.primary.dark
        },
        "&:active": {
          backgroundColor: theme.palette.primary.dark,
          transform: "scale(0.98)"
        },
        "&:disabled": {
          backgroundColor: theme.palette.grey[300],
          color: theme.palette.grey[500],
          cursor: "not-allowed"
        }
      };
      break;
    case "outlined":
      style = {
        ...style,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
        fontSize: theme.typography.button.fontSize,
        padding: theme.spacing(1, 2),
        borderColor: theme.palette.primary.main,
        border: "1px solid",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white
        }
      };
      break;
    default:
      return {};
  }

  return style;
};
export const Button = createStyledComponent(MuiButton, {
  name: "Button",
  slot: "Root",
  overridesResolver(props, styles) {
    const { variant } = props as ButtonProps;

    return [styles.root, variant === "link" && styles.link, variant === "icon" && styles.icon];
  }
})<MuiButtonProps>(({ theme, variant }) =>
  styleButtonVariant(theme, variant)
) as unknown as typeof MuiButton;
