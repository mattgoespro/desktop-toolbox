import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/system";
import { Navigate, RouteObject, createHashRouter } from "react-router-dom";
import { theme } from "@Theme/theme";
import { RouterLink } from "../../Shared/Components/RouterLink/RouterLink";
import { uuid } from "../../Shared/Utils/uuid";
import { Shell } from "../Shell/Shell";
import { ImageToIconConverter } from "../Tools/ImageToIconConverter/ImageToIconConverter";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ThemeProvider theme={theme}>
        <Shell />
      </ThemeProvider>
    ),
    children: [
      {
        index: true,
        path: "*",
        id: "Dashboard",
        element: <Navigate to="/" />
      },
      {
        path: "image-to-icon",
        id: "Image to Icon Converter",
        element: <ImageToIconConverter />
      }
    ]
  }
];

export function configureRouterLinks(options: { onClick: (title: string) => void }): JSX.Element[] {
  const indexRoute = routes[0].children.find((route) => route.index);

  return [
    <Box key="indexRouteBox" sx={{ padding: 1, paddingBottom: 2 }}>
      <RouterLink
        key={uuid()}
        type="button"
        to={indexRoute.path}
        relative="route"
        onClick={() => options.onClick(indexRoute.id)}
      >
        <DashboardRoundedIcon />
      </RouterLink>
    </Box>,
    <Divider key="sidebarDivider" variant="fullWidth" flexItem={true} light={true} />,
    ...routes[0].children
      .filter((route) => !route.index)
      .map((route) => {
        return (
          <RouterLink
            key={uuid()}
            type="button"
            title={route.id}
            to={route.path}
            relative="route"
            onClick={() => options.onClick(route.id)}
          >
            {route.id}
          </RouterLink>
        );
      })
  ];
}

export const Router = createHashRouter(routes);
