import { Outlet } from "react-router";
import { FlexBox } from "src/renderer/app/shared/components/flex-box";
import Typography from "@mui/material/Typography";
import { ToolTile } from "./tool-tile/tool-tile";

export default function Dashboard() {
  return (
    <FlexBox direction="column" justify="start" align="center">
      <Typography variant="h1">Desktop Toolbox</Typography>
      <Typography variant="h2">
        Select from a library of useful desktop utility applications for everyday use.
      </Typography>
      <FlexBox direction="row" align="center" justify="center" wrap>
        <ToolTile
          name="5 Minute Meditation Picker"
          description="Meditate using a random 5 minute meditation video from the @5minutebygreatmeditation YouTube channel."
          route="/meditation-picker"
        />
        <ToolTile
          name="Image to Icon Converter"
          description="Convert images to icons for use in your applications."
          route="/image-to-icon"
        />
      </FlexBox>
      <Outlet />
    </FlexBox>
  );
}
