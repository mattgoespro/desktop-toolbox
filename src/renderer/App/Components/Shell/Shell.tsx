import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { RootAction, RootState } from "redux-observable";
import { Heading } from "@Components/Heading/Heading";
import { Sidebar } from "@Components/Sidebar/Sidebar";
import { SET_HEADING } from "@Redux/Heading/constants";
import { theme } from "@Theme/theme";
import { configureRouterLinks } from "../Router/Router";

const mapStateToProps = (state: RootState) => ({
  title: state.heading.title,
  subtitle: state.heading.subtitle
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      setHeading
    },
    dispatch
  );

const setHeading =
  (title: string, subtitle?: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch({
      type: SET_HEADING,
      payload: { title, subtitle }
    });
  };

type ShellProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    title: string;
    subtitle?: string;
  };

const ShellComponent = (props: ShellProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Sidebar>
        {...configureRouterLinks({
          onClick: props.setHeading
        })}
      </Sidebar>
      <Container>
        <Heading>{props.title}</Heading>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export const Shell = connect(mapStateToProps, mapDispatchToProps)(ShellComponent);
