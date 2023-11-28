import { FormLabel } from "@mui/material";
import { createStyledComponent } from "@Theme/theme";

export const Label = createStyledComponent(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
  lineHeight: theme.typography.body1.lineHeight,
  letterSpacing: theme.typography.body1.letterSpacing,
  fontFamily: theme.typography.body1.fontFamily,
  margin: "0 0 0.5rem 0",
  padding: "0 0 0.5rem 0"
})) as typeof FormLabel;
