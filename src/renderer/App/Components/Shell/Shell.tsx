import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { RootAction, RootState } from "redux-observable";
import { setHeadingTitle } from "@redux/heading/actions";
import Box from "@mui/material/Box";

const mapStateToProps = (state: RootState) => ({
  title: state.heading.title,
  subtitle: state.heading.subtitle
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      setHeadingTitle
    },
    dispatch
  );

type ShellProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    title: string;
    subtitle?: string;
  };

const ShellComponent = (props: ShellProps) => {
  return (
    <>
      <AppBar></AppBar>
      <Box flexDirection="column" justifyContent="start" alignItems="center">
        <Typography variant="h1">{props.title}</Typography>
        <Outlet />
      </Box>
    </>
  );
};

export const Shell = connect(mapStateToProps, mapDispatchToProps)(ShellComponent);
