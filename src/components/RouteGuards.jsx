import React from "react";
import { Navigate } from "react-router-dom";
import { useComplaints } from "./ComplaintsContext";

// Blocks a route unless the user is logged in.
// Use for: /file-complaint, /mycomplaint
export function ProtectedRoute({ children }) {
  const { userId, loading } = useComplaints();

  if (loading) return null;

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Blocks a route if the user is ALREADY logged in.
// Use for: /login, /register
export function PublicOnlyRoute({ children }) {
  const { userId, loading } = useComplaints();

  if (loading) return null;

  if (userId) {
    return <Navigate to="/mycomplaint" replace />;
  }

  return children;
}

// CHANGED: Blocks a route unless the logged-in user's role is 'admin'.
// Use for: /admin
// Note: this is a UX convenience only. The real security boundary is
// Firestore Security Rules — even if someone bypassed this route guard
// (e.g. by editing client state), the database itself refuses to serve
// admin-only data to a non-admin uid.
export function AdminRoute({ children }) {
  const { userId, loading, isAdmin, role } = useComplaints();

  // wait for both auth AND role to resolve before deciding
  if (loading || (userId && role === null)) return null;

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/mycomplaint" replace />;
  }

  return children;
}
