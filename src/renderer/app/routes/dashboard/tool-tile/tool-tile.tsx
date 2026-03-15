import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
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
    <Card
      sx={{
        width: 300,
        position: "relative",
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: "1px",
          backgroundColor: "#00d4ff",
          transition: "width 250ms cubic-bezier(0.4, 0, 0.2, 1)"
        },
        "&:hover::after": {
          width: "100%"
        }
      }}
    >
      <CardHeader
        title={name}
        slotProps={{
          title: {
            variant: "h3",
            sx: {
              fontWeight: 500,
              color: "#00d4ff",
              letterSpacing: "0.08em",
              fontSize: "0.8em"
            }
          }
        }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" sx={{ lineHeight: 1.7, minHeight: "2.5em" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          component={ReactRouterLink}
          to={route}
          underline="none"
          relative="route"
          onClick={onOpenTool}
          viewTransition
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            px: "0.5rem",
            py: "0.25rem"
          }}
        >
          <Typography variant="button">Open</Typography>
          <Box
            component="span"
            sx={{
              fontSize: "0.75rem",
              color: "#00d4ff",
              transition: "transform 150ms ease",
              ".MuiLink-root:hover &": { transform: "translateX(3px)" }
            }}
          >
            →
          </Box>
        </Link>
      </CardActions>
    </Card>
  );
}
