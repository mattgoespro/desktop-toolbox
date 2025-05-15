import { ThemeProvider } from "@mui/system";
import { createHashRouter } from "react-router-dom";
import { theme } from "@theme/theme";
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

export const Router = createHashRouter(routes);
