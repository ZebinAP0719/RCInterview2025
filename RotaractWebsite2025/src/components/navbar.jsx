// src/components/Navbar.jsx
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar({ title = "Dashboard" }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
      >
        Logout
      </button>
    </nav>
  );
}
