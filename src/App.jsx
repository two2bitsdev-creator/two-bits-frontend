import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./LandingPage";
import WpLogin from "./pages/WpLogin";
import WpDashboard from "./pages/WpDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/wp" element={<WpLogin />} />
      <Route path="/wp/dashboard" element={<WpDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
