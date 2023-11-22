import { ThemeProvider } from "@mui/system";
import { Navigate, createHashRouter } from "react-router-dom";
import { Shell } from "./Components/Shell/Shell";
import { ImageToIconConverter } from "./Components/Tools/ImageToIconConverter/ImageToIconConverter";
import { theme } from "./Shared/theme/theme";

const router = createHashRouter([
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
        element: <ImageToIconConverter />
      },
      {
        path: "*",
        index: true,
        element: <Navigate to="/" />
      }
    ]
  }
]);

export default router;
