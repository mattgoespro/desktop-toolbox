import { Outlet } from "react-router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ToolTile } from "./tool-tile/tool-tile";
import { FlexBox } from "../../shared/components/flex-box";
import { routes } from "../../app-router";

export default function Dashboard() {
  return (
    <FlexBox direction="column" justify="start" align="center" sx={{ padding: "2.5rem 1rem" }}>
      <Typography variant="h1">Desktop Toolbox</Typography>
      <Typography variant="h2" sx={{ mb: "1.5rem" }}>
        Select from a library of useful desktop utility applications.
      </Typography>

      {/* Thin cyan accent line */}
      <Box
        sx={{
          width: "48px",
          height: "2px",
          backgroundColor: "#00d4ff",
          borderRadius: "1px",
          mb: "2rem",
          opacity: 0.6
        }}
      />

      <FlexBox direction="row" align="stretch" justify="center" wrap gap={1}>
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
