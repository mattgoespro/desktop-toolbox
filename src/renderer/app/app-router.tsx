import { HashRouter, Route, Routes } from "react-router";
import Dashboard from "./routes/dashboard/dashboard";
import { ImageToIconConverter } from "./routes/tools/image-to-icon-converter/image-to-icon-converter";

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/image-to-icon-converter" element={<ImageToIconConverter />} />
      </Routes>
    </HashRouter>
  );
}
