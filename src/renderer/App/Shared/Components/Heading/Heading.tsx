import { createStyledComponent } from "@Theme/theme";
import { typographyOf } from "../../Theme/Typography/typography";

export const Heading = createStyledComponent("h1", {
  name: "Heading",
  label: "Heading",
  slot: "Root"
})(({ theme }) => ({
  ...typographyOf(theme, "h1")
}));

export const Subheading = createStyledComponent("h2", {
  name: "Subheading",
  label: "Subheading",
  slot: "Root"
})(({ theme }) => ({
  ...typographyOf(theme, "h2")
}));
