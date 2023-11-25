import { createStyledComponent } from "@Theme/theme";

export const Heading = createStyledComponent("h1", { name: "Title", slot: "Root" })(
  ({ theme }) => ({
    color: theme.typography.h1.color,
    fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    letterSpacing: "0.02em"
  })
);

export const Subheading = createStyledComponent("h2", { name: "SubTitle", slot: "Root" })(
  ({ theme }) => ({
    color: theme.typography.h2.color,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    letterSpacing: "-0.02em"
  })
);
