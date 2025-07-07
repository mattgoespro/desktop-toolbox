import { Outlet } from "react-router";
import Typography from "@mui/material/Typography";
import { ToolTile } from "./tool-tile/tool-tile";
import { FlexBox } from "../../shared/components/flex-box";
import { routes } from "../../app-router";

export default function Dashboard() {
  return (
    <FlexBox direction="column" justify="start" align="center">
      <Typography variant="h1">Desktop Toolbox</Typography>
      <Typography variant="h2">
        Select from a library of useful desktop utility applications for everyday use.
      </Typography>
      <FlexBox direction="row" align="center" justify="center" wrap>
        {routes.map((route) => (
          <ToolTile
            key={route.route}
            route={route.route}
            name={route.name}
            description={route.description}
          />
        ))}
      </FlexBox>
      <Outlet />
    </FlexBox>
  );
}
