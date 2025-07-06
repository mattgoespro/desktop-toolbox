import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import Link from "@mui/material/Link";
import { Link as ReactRouterLink } from "react-router";
import { useAppDispatch } from "../../../store/hooks";
import { headingChanged } from "src/renderer/app/store/slices/heading.slice";

type ToolTileProps = {
  name: string;
  description: string;
  route: string;
};

export function ToolTile({ name, description, route }: ToolTileProps) {
  const dispatch = useAppDispatch();

  function onOpenTool() {
    dispatch(headingChanged(name));
  }

  return (
    <Card raised variant="elevation" elevation={3}>
      <CardHeader
        title={name}
        slotProps={{
          title: {
            variant: "h3",
            fontWeight: "400",
            textTransform: "uppercase",
            color: "secondary"
          }
        }}
      ></CardHeader>
      <CardContent>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Link
          component={ReactRouterLink}
          to={route}
          underline="none"
          color="primary"
          relative="route"
          onClick={onOpenTool}
        >
          <Typography variant="button" color="primary">
            Open Tool
          </Typography>
        </Link>
      </CardActions>
    </Card>
  );
}
