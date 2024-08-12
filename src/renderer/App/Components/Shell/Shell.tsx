import { AppBar } from "@mui/material";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { RootAction, RootState } from "redux-observable";
import { setHeadingTitle } from "@redux/heading/actions";
import { FlexContainer } from "@shared/components/flex-container/flex-container";
import { Heading } from "@shared/components/heading/heading";
import { createRouterLinks } from "../router/router";

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
  console.log(
    createRouterLinks({
      onClick: props.setHeadingTitle
    })
  );
  return (
    <>
      <AppBar>
        {...createRouterLinks({
          onClick: props.setHeadingTitle
        })}
      </AppBar>
      <FlexContainer
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        backgroundColor="dark"
      >
        <Heading>{props.title}</Heading>
        <Outlet />
      </FlexContainer>
    </>
  );
};

export const Shell = connect(mapStateToProps, mapDispatchToProps)(ShellComponent);
