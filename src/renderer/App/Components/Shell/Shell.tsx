import { AbcOutlined } from "@mui/icons-material";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Heading } from "../../Shared/Components/Heading/Heading";
import { RouterLink } from "../../Shared/Components/RouterLink/RouterLink";
import { Sidebar } from "../../Shared/Components/Sidebar/Sidebar";
import { theme } from "../../Shared/theme/theme";
import generateUuid from "../../Utils/gen-uuid";

export function Shell() {
  const [appTitle, setAppTitle] = useState("");

  const routerLinks = [
    {
      link: (
        <RouterLink
          key={generateUuid()}
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
            key={generateUuid()}
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
