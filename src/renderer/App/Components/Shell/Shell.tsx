import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Heading } from "@Components/Heading/Heading";
import { Sidebar } from "@Components/Sidebar/Sidebar";
import { theme } from "@Theme/theme";
import { configureRouterLinks } from "../Router/Router";

export function Shell() {
  const [appTitle, setAppTitle] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Sidebar>{...configureRouterLinks({ onClick: setAppTitle })}</Sidebar>

      <Container>
        <Heading>{appTitle}</Heading>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
