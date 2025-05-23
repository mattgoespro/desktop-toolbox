import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Router } from "./components/router/router";
import { store } from "@redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  );
}
