import { Navigate, createHashRouter } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import PDFToImageConverter from "../Dashboard/PDFToImageConverter/PDFToImageConverter";
import { AppNavigator } from "../Navigator/AppNavigator";

const router = createHashRouter([
  {
    path: "/",
    element: <AppNavigator />,
    children: [
      {
        element: <Dashboard />,
        index: true
      },
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
