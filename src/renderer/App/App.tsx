import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./Redux/Store";
import router from "./Shared/Router";

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
