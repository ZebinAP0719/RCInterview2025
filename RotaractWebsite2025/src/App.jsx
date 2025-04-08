import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/select-council" element={<h2>Select Council Page (coming soon)</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
