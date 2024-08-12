import { AppBar as MuiAppBar } from "@mui/material";
import { createStyledComponent } from "@shared/theme/theme";

export const AppBar = createStyledComponent(MuiAppBar, {
  name: "AppBar",
  slot: "Root",
  label: "AppBar"
})(({ theme }) => ({
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "start",
  backgroundColor: theme.palette.background.darkGrey
}));
