import { ThemeProvider } from "@mui/system";
import { Navigate, createHashRouter } from "react-router-dom";
import { theme } from "@Theme/theme";
import { RouterLink } from "../../Shared/Components/RouterLink/RouterLink";
import { uuid } from "../../Shared/Utils/uuid";
import { Shell } from "../Shell/Shell";
import { ImageToIconConverter } from "../Tools/ImageToIconConverter/ImageToIconConverter";

const routes = [
  {
    path: "/",
    element: (
      <ThemeProvider theme={theme}>
        <Shell />
      </ThemeProvider>
    ),
    children: [
      {
        path: "image-to-icon",
        title: "Image to Icon",
        element: <ImageToIconConverter />
      },
      {
        index: true,
        path: "*",
        title: "Dashboard",
        element: <Navigate to="/" />
      }
    ]
  }
];

export function configureRouterLinks(options: { onClick: (title: string) => void }): JSX.Element[] {
  return routes[0].children
    .filter((route) => !route.index)
    .map((route) => {
      return (
        <RouterLink
          key={uuid()}
          type="button"
          name={route.title}
          to={route.path}
          relative="route"
          onClick={() => options.onClick(route.title)}
        >
          {route.title}
        </RouterLink>
      );
    });
}

export const Router = createHashRouter(routes);
