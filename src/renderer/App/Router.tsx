import { Navigate, createHashRouter } from "react-router-dom";
import { ImageToIconConverter } from "./Components/ImageToIconConverter/ImageToIconConverter";
import PdfToImageConverter from "./Components/PdfToImageConverter/PdfToImageConverter";
import { Shell } from "./Components/Shell/Shell";

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
