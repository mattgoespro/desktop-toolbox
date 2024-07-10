import { ListItem as MuiListItem } from "@mui/material";
import { createStyledComponent } from "../../Theme/Theme";

export const ListItem = createStyledComponent(MuiListItem, {
  name: "ListItem",
  slot: "Root"
})(({ theme }) => ({
  "&.ListItem-root": {
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: theme.typography.body1.fontSize,
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    }
  }
})) as unknown as typeof MuiListItem;
