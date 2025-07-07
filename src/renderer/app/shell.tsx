import { Outlet, useLocation } from "react-router";
import { FlexBox } from "./shared/components/flex-box";
import Link from "@mui/material/Link";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Link as ReactRouterLink } from "react-router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Typography from "@mui/material/Typography";
import { headingChanged } from "./store/slices/heading.slice";
import Box from "@mui/material/Box";
import { useMemo } from "react";
import { AlertPopup } from "./shared/components/alert-popup";
import { store } from "./store/store";
import { savePersistedState } from "./store/utils/persistence";

export default function Shell() {
  const dispatch = useAppDispatch();
  const heading = useAppSelector((state) => state.headingReducer.heading);
  const location = useLocation();

  const pageAlerts =
    useAppSelector((state) => {
      if (["/tools/iconsmith"].includes(location.pathname)) {
        return state.alertsReducer["iconsmith"];
      }
    }) ?? [];

  console.log("Current location in shell:", location.pathname);

  // Subscribe to store changes and persist heading state
  store.subscribe(() => {
    const state = store.getState();
    savePersistedState({
      heading: { heading: state.headingReducer.heading }
    });
  });

  function onNavigateBack() {
    dispatch(headingChanged(undefined));
    console.log("Navigated back to dashboard");
  }

  const BackNavLink = useMemo(
    () => (
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
    ),
    [onNavigateBack]
  );

  const Header = useMemo(() => {
    return (
      <Typography variant="h1" sx={{ margin: "1rem 0.875rem 0.5rem" }}>
        {heading}
      </Typography>
    );
  }, [heading]);

  return (
    <>
      <Box width="100%">
        {location.pathname !== "/" && BackNavLink}
        <FlexBox direction="column" align="center">
          {Header}
          <Outlet />
        </FlexBox>
      </Box>
      <Box id="alerts" sx={{ position: "absolute", bottom: 0, right: 0, padding: "1rem" }}>
        {pageAlerts.map((alert, index) => (
          <AlertPopup
            message={alert.message}
            severity={alert.severity || "info"}
            key={index}
            onClose={() => {}}
          />
        ))}
      </Box>
    </>
  );
}
