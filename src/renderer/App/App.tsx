import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./redux/store/store";
import { Router } from "./components/router/router";

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  );
}
