// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Added this line

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0DrIGTvY0U3GgucUxisj3XBRFneE4w88",
  authDomain: "rotaractwebsite2025-e1d60.firebaseapp.com",
  projectId: "rotaractwebsite2025-e1d60",
  storageBucket: "rotaractwebsite2025-e1d60.firebasestorage.app",
  messagingSenderId: "133087289949",
  appId: "1:133087289949:web:88cd7ad2d1805ee8fbe3b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // <-- Added this line

export { auth, provider, db }; // <-- Export db also
