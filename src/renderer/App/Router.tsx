import { Navigate, createHashRouter } from "react-router-dom";
import PdfToImageConverter from "./Components/PdfToImageConverter/PdfToImageConverter";
import { Shell } from "./Components/Shell/Shell";

const router = createHashRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      {
        path: "/pdf-to-image-converter",
        element: <PdfToImageConverter />
      },
      {
        path: "*",
        element: <Navigate to="/" />
      }
    ]
  }
]);

export default router;
