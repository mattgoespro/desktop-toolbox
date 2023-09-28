import { ListItemButton, ListItemIcon, ListItemText, List } from "@mui/material";
import uuid from "../../Shared/Utils/uuid";
import { apps } from "./apps";

export function Menu() {
  const appMenuItems = apps.map((app) => {
    return (
      <ListItemButton key={uuid()}>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary={app} />
      </ListItemButton>
    );
  });

  return <List component="nav">{...appMenuItems}</List>;
}
