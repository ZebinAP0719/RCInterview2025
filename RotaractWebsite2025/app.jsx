import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SelectCouncil from "./pages/selectCouncil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/select-council" element={<SelectCouncil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
