import { Stack } from "@mui/material";
import { createStyledComponent } from "../../Theme/theme";

export const Sidebar = createStyledComponent(Stack, {
  name: "Sidebar",
  label: "Sidebar",
  slot: "Root"
})(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: 150,
  flexShrink: 0
}));
