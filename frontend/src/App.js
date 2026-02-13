import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import WelcomePage from "./pages/WelcomePage";
import DigitalIdPage from "./pages/DigitalIdPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* User */}
        <Route path="/welcome" element={<WelcomePage />} />

        {/* FINAL PAGE (Digital ID + Congratulations) */}
        <Route path="/digital-id/:workId" element={<DigitalIdPage />} />
      </Routes>
    </Router>
  );
}

export default App;