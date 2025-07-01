import { Outlet, useLocation } from "react-router";
import { FlexBox } from "./shared/components/flex-box";
import Link from "@mui/material/Link";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Link as ReactRouterLink } from "react-router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Typography from "@mui/material/Typography";
import { headingChanged } from "./store/slices/heading.slice";
import Box from "@mui/material/Box";

export default function Shell() {
  const dispatch = useAppDispatch();
  const heading = useAppSelector((state) => state.headingReducer.heading);

  const location = useLocation();
  console.log("Current location in shell:", location.pathname);

  function onNavigateBack() {
    dispatch(headingChanged(undefined));
    console.log("Navigated back to dashboard");
  }

  return (
    <Box width="100%">
      {location.pathname !== "/" && (
        <Link
          color="primary"
          component={ReactRouterLink}
          to="/"
          underline="none"
          onClick={onNavigateBack}
          sx={{ position: "absolute", top: 16, left: 16, zIndex: 1000 }}
        >
          <ArrowBack />
        </Link>
      )}
      <FlexBox direction="column" align="center">
        <Typography variant="h1">{heading}</Typography>
        <Outlet />
      </FlexBox>
    </Box>
  );
}
