import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import Box from "@mui/system/Box";
import { createElement, useState } from "react";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"
  }
}));

type SidebarProps = {
  children?: JSX.Element[];
};

export function CollapseSidebar(props: SidebarProps) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  function getListItemIcons(): JSX.Element[] {
    return props.children
      .filter((child) => child.type.name === "ListItem")
      .map((listItem, index) => (
        <IconButton key={index} color="inherit" aria-label="open drawer">
          {createElement(
            listItem.props.icon,
            listItem.props.icon.props,
            listItem.props.icon.props.children.map((c) => createElement(c))
          )}
        </IconButton>
      ));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "background.paper"
      }}
    >
      <IconButton color="inherit" aria-label="open drawer" onClick={() => toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      {getListItemIcons()}
      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <div>
          <IconButton onClick={() => toggleDrawer(true)}>
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
}
