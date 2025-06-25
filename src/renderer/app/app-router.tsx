import { HashRouter, Route, Routes } from "react-router";
import Dashboard from "./routes/dashboard/dashboard";
import { IconSmith } from "./routes/tools/iconsmith";
import { Shell } from "./shell";

export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Dashboard />} />
          <Route path="/image-to-icon-converter" element={<IconSmith />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
