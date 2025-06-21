import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme } from "./shared/theme";
import { store } from "./store/store";
import { AppRouter } from "./app-router";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
}
