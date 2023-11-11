import { ListItem } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import CollapseSidebar from "renderer/shared/Sidebar/Sidebar";
import { theme } from "renderer/shared/Theme/Theme";
import Title from "renderer/shared/Title/Title";
import { RouterLink } from "../Shared/Theme/MaterialRouterLink";
import styles from "./Shell.module.scss";

export function Shell() {
  const [appTitle, setAppTitle] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <CollapseSidebar>
        <ListItem>
          <RouterLink
            type="button"
            to="image-to-icon"
            relative="route"
            onClick={() => setAppTitle("Image to Icon")}
          >
            Image to Icon
          </RouterLink>
        </ListItem>
        <ListItem>
          <RouterLink
            to="pdf-to-image"
            relative="route"
            type="button"
            onClick={() => setAppTitle("PDF to Image")}
          >
            PDF to Image
          </RouterLink>
        </ListItem>
      </CollapseSidebar>

      <div className={styles["shell-content"]}>
        <Title className={styles.title} title={appTitle} />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
