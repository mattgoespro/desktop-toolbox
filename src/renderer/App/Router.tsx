import { Navigate, createHashRouter } from "react-router-dom";
import PDFToImageConverter from "./Components/PDFToImageConverter/PDFToImageConverter";
import { Shell } from "./Components/Shell/Shell";

const router = createHashRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      {
        path: "/pdf-to-image-converter",
        element: <PDFToImageConverter />
      },
      {
        path: "*",
        element: <Navigate to="/" />
      }
    ]
  }
]);

export default router;
