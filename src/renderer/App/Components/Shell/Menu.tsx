import { ListItemButton, ListItemIcon, ListItemText, List } from "@mui/material";
import uuid from "../../Shared/Utils/uuid";

const apps = ["PDF To Image Converter", "Image To Icon Converter"];

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
