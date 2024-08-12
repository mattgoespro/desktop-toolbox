import { Link } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { createHashRouter } from "react-router-dom";
import { theme } from "@shared/theme/theme";
import { RouterLink } from "../../shared/components/router-link/router-link";
import { uuid } from "../../shared/utils/generate-uuid";
import { ImageToIconConverter } from "../image-to-icon-converter/image-to-icon-converter";
import { Shell } from "../shell/shell";

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
        index: true,
        path: "image-to-icon",
        heading: "Image to Icon Converter",
        element: <ImageToIconConverter />
      }
    ]
  }
];

export function createRouterLinks(options: { onClick: (title: string) => void }): JSX.Element[] {
  return routes[0].children.map<JSX.Element>((route) => (
    <Link variant="button" key={uuid()} href="">
      {route.heading}
    </Link>
  ));
}

export const Router = createHashRouter(routes);
