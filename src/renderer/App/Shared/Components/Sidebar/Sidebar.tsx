import { Stack } from "@mui/material";
import { ReactNode } from "react";
import { createStyledComponent } from "../../Theme/theme";

type SidebarProps = {
  children: ReactNode;
};

export const Sidebar = createStyledComponent(Stack)<SidebarProps>(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: 240,
    boxSizing: "border-box",
    borderRight: "none",
    backgroundColor: theme.palette.background.paper
  }
}));
