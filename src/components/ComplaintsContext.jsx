import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

const ComplaintsContext = createContext();

export function ComplaintsProvider({ children }) {
  const [complaints, setComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [complaintsLoading, setComplaintsLoading] = useState(false);

  // CHANGED: admin-request workflow state
  const [myAdminRequest, setMyAdminRequest] = useState(null); // this user's latest request, if any
  const [pendingAdminRequests, setPendingAdminRequests] = useState([]); // admin-only: all pending requests

  const isAdmin = role === "admin";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setRole(null);
        setComplaints([]);
        setAllComplaints([]);
        setMyAdminRequest(null);
        setPendingAdminRequests([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = onSnapshot(
      doc(db, "users", userId),
      (snap) =>
        setRole(snap.exists() ? snap.data().role || "resident" : "resident"),
      (error) => {
        console.error("Error fetching role:", error);
        setRole("resident");
      },
    );
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    setComplaintsLoading(true);
    const q = query(
      collection(db, "complaints"),
      where("userId", "==", userId),
      orderBy("date", "desc"),
    );
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setComplaints(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setComplaintsLoading(false);
      },
      (error) => {
        console.error("Error fetching complaints:", error);
        setComplaints([]);
        setComplaintsLoading(false);
      },
    );
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (!isAdmin) {
      setAllComplaints([]);
      return;
    }
    const q = query(collection(db, "complaints"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snap) =>
        setAllComplaints(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (error) => {
        console.error("Error fetching all complaints:", error);
        setAllComplaints([]);
      },
    );
    return () => unsubscribe();
  }, [isAdmin]);

  // CHANGED: listen to MY OWN admin requests (most recent first), keep the latest one
  useEffect(() => {
    if (!userId) {
      setMyAdminRequest(null);
      return;
    }
    const q = query(
      collection(db, "adminRequests"),
      where("uid", "==", userId),
      orderBy("requestedAt", "desc"),
    );
    const unsubscribe = onSnapshot(
      q,
      (snap) =>
        setMyAdminRequest(
          snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() },
        ),
      (error) => {
        console.error("Error fetching own admin request:", error);
        setMyAdminRequest(null);
      },
    );
    return () => unsubscribe();
  }, [userId]);

  // CHANGED: admin-only listener for ALL pending requests, to review
  useEffect(() => {
    if (!isAdmin) {
      setPendingAdminRequests([]);
      return;
    }
    const q = query(
      collection(db, "adminRequests"),
      where("status", "==", "pending"),
      orderBy("requestedAt", "asc"),
    );
    const unsubscribe = onSnapshot(
      q,
      (snap) =>
        setPendingAdminRequests(
          snap.docs.map((d) => ({ id: d.id, ...d.data() })),
        ),
      (error) => {
        console.error("Error fetching pending admin requests:", error);
        setPendingAdminRequests([]);
      },
    );
    return () => unsubscribe();
  }, [isAdmin]);

  const addComplaint = async (complaint) => {
    if (!userId) return;
    try {
      await addDoc(collection(db, "complaints"), {
        ...complaint,
        userId,
        date: Timestamp.now(),
        status: "Pending",
      });
    } catch (error) {
      console.error("Error adding complaint:", error);
    }
  };

  const deleteComplaint = async (complaintId) => {
    if (!complaintId) return;
    try {
      await deleteDoc(doc(db, "complaints", complaintId));
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const updateComplaintStatus = async (complaintId, newStatus) => {
    if (!complaintId || !isAdmin) return;
    try {
      await updateDoc(doc(db, "complaints", complaintId), {
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  // CHANGED: a resident asks to become an admin — creates an audit-trailed request
  const requestAdminAccess = async (reason) => {
    if (!userId || isAdmin) return;
    try {
      await addDoc(collection(db, "adminRequests"), {
        uid: userId,
        email: auth.currentUser?.email || "",
        reason: reason || "",
        status: "pending",
        requestedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error submitting admin request:", error);
    }
  };

  // CHANGED: an existing admin approves/rejects — writes both the request AND
  // (if approved) the target user's role, in one atomic batch. Only an admin
  // can call this — Firestore rules independently enforce the same thing
  // server-side, this client check is just for UX.
  const reviewAdminRequest = async (request, decision) => {
    if (!isAdmin || !request?.id || !request?.uid) return;
    try {
      const batch = writeBatch(db);
      batch.update(doc(db, "adminRequests", request.id), {
        status: decision, // 'approved' | 'rejected'
        reviewedBy: auth.currentUser.uid,
        reviewedAt: serverTimestamp(),
      });
      if (decision === "approved") {
        batch.update(doc(db, "users", request.uid), { role: "admin" });
      }
      await batch.commit();
    } catch (error) {
      console.error("Error reviewing admin request:", error);
    }
  };

  return (
    <ComplaintsContext.Provider
      value={{
        complaints,
        allComplaints,
        addComplaint,
        deleteComplaint,
        updateComplaintStatus,
        userId,
        role,
        isAdmin,
        loading,
        complaintsLoading,
        myAdminRequest,
        pendingAdminRequests,
        requestAdminAccess,
        reviewAdminRequest,
      }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
}

export function useComplaints() {
  return useContext(ComplaintsContext);
}
