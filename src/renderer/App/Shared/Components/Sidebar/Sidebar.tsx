import { Stack, styled } from "@mui/material";
import { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
};

export const Sidebar = styled(Stack)<SidebarProps>(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: 240,
    boxSizing: "border-box",
    borderRight: "none",
    backgroundColor: theme.palette.background.paper
  }
}));
