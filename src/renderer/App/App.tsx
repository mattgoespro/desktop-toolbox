import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.module.scss";
import { Router } from "./Components/Router/Router";
import store from "./Redux/Store";

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  );
}
