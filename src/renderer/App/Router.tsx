import { Navigate, createHashRouter } from "react-router-dom";
import { Shell } from "./Components/Shell/Shell";
import { ImageToIconConverter } from "./Components/ToolApps/ImageToIconConverter/ImageToIconConverter";
import PdfToImageConverter from "./Components/ToolApps/PdfToImageConverter/PdfToImageConverter";

const router = createHashRouter([
  {
    path: "/",
    element: <Shell />,
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
        element: <Navigate to="/" />
      }
    ]
  }
]);

export default router;
