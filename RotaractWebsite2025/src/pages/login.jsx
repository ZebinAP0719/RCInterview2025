import React from "react";
import { auth, provider } from "../firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

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
    <div className="login-container">
      <div className="glass-card animate">
        <h1 className="title">Rotaract Council 2025</h1>
        <p className="subtitle">Register for Interviews</p>
        <button className="google-login-btn" onClick={handleLogin}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
