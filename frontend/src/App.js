import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import WelcomePage from "./pages/WelcomePage";
import CongratulationPage from "./pages/CongratulationPage";
import DigitalIdPage from "./pages/DigitalIdPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin login page */}
        <Route path="/" element={<AdminLogin />} />

        {/* Admin dashboard page */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* User pages */}
        <Route path="/welcome/:passportId" element={<WelcomePage />} />
        <Route path="/congratulation/:passportId" element={<CongratulationPage />} />

        {/* DIGITAL ID route */}
        <Route path="/digital-id/:workId" element={<DigitalIdPage />} />
      </Routes>
    </Router>
  );
}

export default App;