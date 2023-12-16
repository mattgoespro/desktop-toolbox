import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { RootAction, RootState } from "redux-observable";
import { FlexContainer } from "@Components/FlexContainer/FlexContainer";
import { Heading } from "@Components/Heading/Heading";
import { Sidebar } from "@Components/Sidebar/Sidebar";
import { setHeadingTitle } from "@Redux/Heading/actions";
import { configureRouterLinks } from "../Router/Router";

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
      <Sidebar>
        {...configureRouterLinks({
          onClick: props.setHeadingTitle
        })}
      </Sidebar>
      <FlexContainer
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        backgroundColor="lightGrey"
      >
        <Heading>{props.title}</Heading>
        <Outlet />
      </FlexContainer>
    </>
  );
};

export const Shell = connect(mapStateToProps, mapDispatchToProps)(ShellComponent);
