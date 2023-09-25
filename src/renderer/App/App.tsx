import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Dashboard from "./Dashboard/Dashboard";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
