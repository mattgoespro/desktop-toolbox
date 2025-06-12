import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme } from "./shared/theme";
import { store } from "./store/store";
import { Outlet } from "react-router";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </ThemeProvider>
  );
}
