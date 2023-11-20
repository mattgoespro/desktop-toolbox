import { ThemeProvider } from "@mui/system";
import { Navigate, createHashRouter } from "react-router-dom";
import { theme } from "./Components/Shared/Theme/Theme";
import { Shell } from "./Components/Shell/Shell";
import { ImageToIconConverter } from "./Components/ToolApps/ImageToIconConverter/ImageToIconConverter";
import PdfToImageConverter from "./Components/ToolApps/PdfToImageConverter/PdfToImageConverter";

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
        path: "pdf-to-image",
        element: <PdfToImageConverter />
      },
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
