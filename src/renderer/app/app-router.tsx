import { createHashRouter, RouterProvider } from "react-router";
import IconSmith from "./routes/tools/iconsmith";
import Shell from "./shell";
import Dashboard from "./routes/dashboard/dashboard";

const router = createHashRouter([
  {
    path: "/",
    Component: Shell,
    children: [
      {
        index: true,
        Component: Dashboard
      },
      {
        path: "tools",
        children: [
          {
            path: "iconsmith",
            Component: IconSmith
          }
        ]
      }
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
