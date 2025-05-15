import { ReactNode } from "react";
import { createStyled } from "@theme/theme";

export type ImageProps = {
  src: string;
  label?: ReactNode;
  fillSpace?: boolean;
};

export const Image = createStyled("img", {
  name: "Image",
  slot: "Root"
})<ImageProps>((options) => {
  let style: Record<string, unknown> = {
    display: "block",
    position: "relative",
    maxWidth: "100%",
    height: "auto"
  };

  if (options.label != null) {
    style = {
      ...style,
      "&::after": {
        content: `'${options.label}'`,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "0.5rem",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
        fontSize: "1rem",
        lineHeight: 1.5
      }
    };
  }

  if (options.fillSpace) {
    style = { ...style, width: "100%", height: "100%", minWidth: "100%", minHeight: "100%" };
  }

  return style;
});
