import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admindashboard";
import Login from "./pages/login";
import SelectCouncil from "./pages/selectcouncil";
import SeniorCouncil from "./pages/seniorcouncil"; // ✅ Import this
import JuniorCouncil from "./pages/juniorcouncil";
import UserDashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/select-council" element={<SelectCouncil />} />
        <Route path="/senior" element={<SeniorCouncil />} /> {/* ✅ Add this */}
        <Route path="/junior" element={<JuniorCouncil />} /> 
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
