import { Stack } from "@mui/material";
import { createStyledComponent } from "../../Theme/Theme";

export const Sidebar = createStyledComponent(Stack, {
  name: "Sidebar",
  label: "Sidebar",
  slot: "Root"
})(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 150,
  flexShrink: 0,
  padding: theme.spacing(0.5)
}));
