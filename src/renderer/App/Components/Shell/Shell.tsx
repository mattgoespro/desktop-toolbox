import { theme } from "@Theme/theme";
import { AbcOutlined } from "@mui/icons-material";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Heading } from "@Components/Heading/Heading";
import { RouterLink } from "@Components/RouterLink/RouterLink";
import { Sidebar } from "@Components/Sidebar/Sidebar";
import { uuid } from "generate-uuid";

export function Shell() {
  const [appTitle, setAppTitle] = useState("");

  const routerLinks = [
    {
      link: (
        <RouterLink
          key={uuid()}
          type="button"
          name="Image to Icon"
          to="image-to-icon"
          relative="route"
          onClick={() => setAppTitle("Image to Icon")}
        >
          Image to Icon
        </RouterLink>
      ),
      icon: AbcOutlined
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Sidebar>
        {routerLinks.map((routerLink) => (
          <RouterLink
            key={uuid()}
            type="button"
            to={routerLink.link.props.to}
            onClick={() => setAppTitle(routerLink.link.props.name)}
          >
            <routerLink.icon />
          </RouterLink>
        ))}
      </Sidebar>

      <Container>
        <Heading>{appTitle}</Heading>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
