// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyNYgaTVXTPQIKPIH3PxsIFvDb-mWlMRE",
  authDomain: "training-project-ef4bb.firebaseapp.com",
  projectId: "training-project-ef4bb",
  storageBucket: "training-project-ef4bb.appspot.com", // <-- fix: should be .appspot.com
  messagingSenderId: "872269063989",
  appId: "1:872269063989:web:d922ee722767d6fa878e7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and db for use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);
