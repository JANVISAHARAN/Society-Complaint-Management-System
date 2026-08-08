import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // CHANGED: create a matching users/{uid} doc with a default role.
      // Every account starts as 'resident' — admin is granted manually
      // in the Firebase console, never through client-side signup.
      await setDoc(doc(db, "users", cred.user.uid), {
        email: cred.user.email,
        role: "resident",
        createdAt: serverTimestamp(),
      });

      setSuccess("Registration successful! You can now log in.");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">Register for SocietyCare</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-2"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-2"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md">Register</button>
          {error && <p className="text-red-600 mt-2 text-center text-sm">{error}</p>}
          {success && <p className="text-green-600 mt-2 text-center text-sm">{success}</p>}
        </form>
        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;