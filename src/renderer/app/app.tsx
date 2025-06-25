import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./shared/theme";
import { store } from "./store/store";
import { AppRouter } from "./app-router";
import { StyledEngineProvider } from "@mui/material/styles";
import DevTools from "./devtools";

export function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouter />
          <DevTools />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
