import { auth, provider } from "../FireBase/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/select-council");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Login to Continue</h2>
      <button onClick={handleLogin} style={{ padding: "10px 25px", fontSize: "16px" }}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
