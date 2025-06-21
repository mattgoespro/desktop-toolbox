import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import Link from "@mui/material/Link";
import { Link as ReactRouterLink } from "react-router";

type ToolTileProps = {
  name: string;
  description: string;
  route: string;
};

export function ToolTile({ name, description, route }: ToolTileProps) {
  return (
    <Card raised variant="elevation" elevation={3}>
      <CardHeader
        title={name}
        subheader={description}
        slotProps={{
          title: { variant: "h5", textTransform: "uppercase" },
          subheader: { variant: "body2" }
        }}
      ></CardHeader>
      <CardContent>
        <Typography variant="body2">{}</Typography>
      </CardContent>
      <CardActions>
        <Link
          component={ReactRouterLink}
          to={route}
          underline="hover"
          color="primary"
          relative="route"
        >
          <Typography variant="button">Open Tool</Typography>
        </Link>
      </CardActions>
    </Card>
  );
}
