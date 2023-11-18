import { LocalCarWashOutlined, TableBar } from "@mui/icons-material";
import { ThemeProvider } from "@mui/system";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { theme } from "renderer/shared/Theme/Theme";
import Title from "renderer/shared/Title/Title";
import { ListItem } from "../Shared/ListItem/ListItem";
import { CollapseSidebar } from "../Shared/Sidebar/Sidebar";
import { RouterLink } from "../Shared/Theme/MaterialRouterLink";
import styles from "./Shell.module.scss";

export function Shell() {
  const [appTitle, setAppTitle] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <CollapseSidebar>
        <ListItem contained icon={LocalCarWashOutlined}>
          <RouterLink
            type="button"
            to="image-to-icon"
            relative="route"
            onClick={() => setAppTitle("Image to Icon")}
          >
            Image to Icon
          </RouterLink>
        </ListItem>
        <ListItem contained icon={TableBar}>
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
