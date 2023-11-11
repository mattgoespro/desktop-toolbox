import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import Box from "@mui/system/Box";
import { useState } from "react";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"
  }
}));

type SidebarProps = {
  children?: React.ReactNode[];
};

const CollapseSidebar = (props: SidebarProps) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          {props.children.map((child, index) => (
            <ListItemButton key={index}>{child}</ListItemButton>
          ))}
        </List>
      </StyledDrawer>
    </Box>
  );
};

export default CollapseSidebar;
