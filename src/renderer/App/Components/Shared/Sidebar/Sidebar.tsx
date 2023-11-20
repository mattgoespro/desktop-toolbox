import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, Drawer, styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Box from "@mui/system/Box";
import { ReactNode, useState } from "react";

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"
  }
}));

type SidebarProps = {
  children: { collapseComponents?: ReactNode; expandComponents?: ReactNode };
};

export function Sidebar(props: SidebarProps) {
  const { expandComponents, collapseComponents } = props.children;

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Box direction="column">
      <IconButton color="inherit" aria-label="open drawer" onClick={() => toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      {collapseComponents}
      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <Container>
          <IconButton onClick={() => toggleDrawer(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </Container>
        <List>{expandComponents}</List>
      </StyledDrawer>
    </Box>
  );
}
