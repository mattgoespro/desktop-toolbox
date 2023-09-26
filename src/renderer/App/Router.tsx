import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import PDFToImageConverter from "./Dashboard/PDFToImageConverter/PDFToImageConverter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        index: true
      },
      {
        path: "pdf-to-image-converter",
        element: <PDFToImageConverter />
      }
    ]
  }
]);

export default router;
