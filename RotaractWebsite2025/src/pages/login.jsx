import React from "react";
import { auth, provider, db } from "../firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      console.log("Logged in as:", email);

      const seniorRef = collection(db, "seniorCouncilApplications");
      const juniorRef = collection(db, "juniorCouncilApplications");

      const seniorQuery = query(seniorRef, where("email", "==", email));
      const juniorQuery = query(juniorRef, where("email", "==", email));

      const seniorSnapshot = await getDocs(seniorQuery);
      const juniorSnapshot = await getDocs(juniorQuery);

      if (!seniorSnapshot.empty || !juniorSnapshot.empty) {
        navigate("/dashboard");
      } else {
        navigate("/select-council");
      }
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
