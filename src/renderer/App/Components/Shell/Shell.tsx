import { AbcOutlined, AbcTwoTone } from "@mui/icons-material";
import { ThemeProvider } from "@mui/system";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { theme } from "renderer/shared/Theme/Theme";
import Title from "renderer/shared/Title/Title";
import generateUuid from "../../Utils/gen-uuid";
import { ListItemStyled } from "../Shared/ListItem/ListItem";
import { Sidebar } from "../Shared/Sidebar/Sidebar";
import { RouterLink } from "../Shared/Theme/MaterialRouterLink";
import styles from "./Shell.module.scss";
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
    },
    {
      link: (
        <RouterLink
          key={generateUuid()}
          type="button"
          name="Icon to Image"
          to="icon-to-image"
          relative="route"
          onClick={() => setAppTitle("Icon to Image")}
        >
          Icon to Image
        </RouterLink>
      ),
      icon: AbcTwoTone
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Sidebar>
        {{
          collapseComponents: routerLinks.map((routerLink) => (
            <RouterLink
              key={generateUuid()}
              type="button"
              to={routerLink.link.props.to}
              onClick={() => setAppTitle(routerLink.link.props.name)}
            >
              <routerLink.icon />
            </RouterLink>
          )),
          expandComponents: routerLinks.map((routerLink) => (
            <ListItemStyled
              key={generateUuid()}
              onClick={() => setAppTitle(routerLink.link.props.name)}
            >
              {routerLink.link}
            </ListItemStyled>
          ))
        }}
      </Sidebar>

      <div className={styles["shell-content"]}>
        <Title className={styles.title} title={appTitle} />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
