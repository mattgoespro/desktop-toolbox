import { Outlet, useLocation } from "react-router";
import { FlexBox } from "./shared/components/flex-box";
import Link from "@mui/material/Link";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Link as ReactRouterLink } from "react-router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Typography from "@mui/material/Typography";
import { headingChanged } from "./store/slices/heading.slice";

export function Shell() {
  const dispatch = useAppDispatch();
  const heading = useAppSelector((state) => state.headingReducer.heading);

  const location = useLocation();
  console.log("Current location in Shell:", location.pathname);

  function onNavigateBack() {
    dispatch(headingChanged(undefined));
  }

  return (
    <FlexBox justify="start" align="stretch" direction="column">
      {location.pathname !== "/" && (
        <FlexBox direction="row" justify="start">
          <Link
            color="primary"
            component={ReactRouterLink}
            to="/"
            underline="none"
            onClick={onNavigateBack}
          >
            <ArrowBack />
          </Link>
          <Typography variant="h2" color="secondary" sx={{ marginLeft: 1 }}>
            {heading}
          </Typography>
        </FlexBox>
      )}
      <Outlet />
    </FlexBox>
  );
}
