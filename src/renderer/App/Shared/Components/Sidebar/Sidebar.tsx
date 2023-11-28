import { Stack } from "@mui/material";
import { ReactNode } from "react";
import { createStyledComponent } from "../../Theme/theme";

type SidebarProps = {
  children: ReactNode;
};

export const Sidebar = createStyledComponent(Stack, {
  name: "Sidebar",
  label: "Sidebar",
  slot: "Root"
})<SidebarProps>(({ theme }) => ({
  width: 150,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: 240,
    boxSizing: "border-box",
    borderRight: "none",
    backgroundColor: theme.palette.background.paper
  }
}));
