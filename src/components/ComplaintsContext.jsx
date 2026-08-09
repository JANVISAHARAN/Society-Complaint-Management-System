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
  setDoc,
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

  const [myAdminRequest, setMyAdminRequest] = useState(null);
  const [myAdminRequestLoaded, setMyAdminRequestLoaded] = useState(false);
  const [pendingAdminRequests, setPendingAdminRequests] = useState([]);
  const [admins, setAdmins] = useState([]);

  // CHANGED: three-tier role model. 'owner' counts as an admin for complaint
  // access, but only 'owner' can manage who holds the admin role at all.
  const isAdmin = role === "admin" || role === "owner";
  const isOwner = role === "owner";

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
        setMyAdminRequestLoaded(false);
        setPendingAdminRequests([]);
        setAdmins([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = onSnapshot(
      doc(db, "users", userId),
      (snap) => {
        if (snap.exists()) {
          setRole(snap.data().role || "resident");
        } else {
          // Self-heal: any account missing a users/{uid} doc gets one,
          // always as 'resident' — role never gets upgraded by this path.
          setRole("resident");
          setDoc(doc(db, "users", userId), {
            email: auth.currentUser?.email || "",
            role: "resident",
            createdAt: serverTimestamp(),
          }).catch((err) => console.error("Error self-healing user doc:", err));
        }
      },
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

  useEffect(() => {
    if (!userId) {
      setMyAdminRequest(null);
      setMyAdminRequestLoaded(false);
      return;
    }
    setMyAdminRequestLoaded(false);
    const unsubscribe = onSnapshot(
      doc(db, "adminRequests", userId),
      (snap) => {
        setMyAdminRequest(
          snap.exists() ? { id: snap.id, ...snap.data() } : null,
        );
        setMyAdminRequestLoaded(true);
      },
      (error) => {
        console.error("Error fetching own admin request:", error);
        setMyAdminRequest(null);
        setMyAdminRequestLoaded(true);
      },
    );
    return () => unsubscribe();
  }, [userId]);

  // CHANGED: owner-only now, not every admin
  useEffect(() => {
    if (!isOwner) {
      setPendingAdminRequests([]);
      return;
    }
    const q = query(
      collection(db, "adminRequests"),
      where("status", "==", "pending"),
    );
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        rows.sort(
          (a, b) =>
            (a.requestedAt?.seconds || 0) - (b.requestedAt?.seconds || 0),
        );
        setPendingAdminRequests(rows);
      },
      (error) => {
        console.error("Error fetching pending admin requests:", error);
        setPendingAdminRequests([]);
      },
    );
    return () => unsubscribe();
  }, [isOwner]);

  // CHANGED: owner-only — fetch everyone with role 'admin' OR 'owner', so the
  // owner can see (and manage / transfer to) the full leadership list.
  useEffect(() => {
    if (!isOwner) {
      setAdmins([]);
      return;
    }
    const q = query(
      collection(db, "users"),
      where("role", "in", ["admin", "owner"]),
    );
    const unsubscribe = onSnapshot(
      q,
      (snap) => setAdmins(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (error) => {
        console.error("Error fetching admins list:", error);
        setAdmins([]);
      },
    );
    return () => unsubscribe();
  }, [isOwner]);

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

  const requestAdminAccess = async (reason) => {
    if (!userId || isAdmin) return { ok: false, message: "Not eligible." };
    // CHANGED: only block while a request is actively pending. Both
    // 'rejected' and 'approved-but-since-revoked' are valid states to
    // request again from.
    if (myAdminRequest && myAdminRequest.status === "pending") {
      return { ok: false, message: "You already have a pending request." };
    }
    try {
      await setDoc(doc(db, "adminRequests", userId), {
        email: auth.currentUser?.email || "",
        reason: reason || "",
        status: "pending",
        requestedAt: serverTimestamp(),
      });
      return { ok: true };
    } catch (error) {
      console.error("Error submitting admin request:", error);
      return { ok: false, message: error.message };
    }
  };

  // CHANGED: owner-only now
  const reviewAdminRequest = async (request, decision) => {
    if (!isOwner || !request?.id)
      return { ok: false, message: "Only the owner can review requests." };
    try {
      const batch = writeBatch(db);
      batch.update(doc(db, "adminRequests", request.id), {
        status: decision,
        reviewedBy: auth.currentUser.uid,
        reviewedAt: serverTimestamp(),
      });
      if (decision === "approved") {
        batch.update(doc(db, "users", request.id), { role: "admin" });
      }
      await batch.commit();
      return { ok: true };
    } catch (error) {
      console.error("Error reviewing admin request:", error);
      return { ok: false, message: error.message };
    }
  };

  // CHANGED: owner-only now; still can't act on your own doc (owner can't
  // demote themselves this way — that only happens via transferOwnership).
  const demoteAdmin = async (targetUid) => {
    if (!isOwner)
      return { ok: false, message: "Only the owner can revoke admin access." };
    if (targetUid === userId)
      return { ok: false, message: "You can't revoke your own access here." };
    try {
      await updateDoc(doc(db, "users", targetUid), { role: "resident" });
      return { ok: true };
    } catch (error) {
      console.error("Error demoting admin:", error);
      return { ok: false, message: error.message };
    }
  };

  // CHANGED: hand off ownership to an existing admin, atomically.
  // The current owner becomes a regular admin in the same batch — there is
  // never a moment with zero owners or two owners.
  const transferOwnership = async (targetUid) => {
    if (!isOwner)
      return { ok: false, message: "Only the owner can transfer ownership." };
    if (targetUid === userId)
      return { ok: false, message: "You're already the owner." };
    try {
      const batch = writeBatch(db);
      batch.update(doc(db, "users", targetUid), { role: "owner" });
      batch.update(doc(db, "users", userId), { role: "admin" });
      await batch.commit();
      return { ok: true };
    } catch (error) {
      console.error("Error transferring ownership:", error);
      return { ok: false, message: error.message };
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
        isOwner, // CHANGED
        loading,
        complaintsLoading,
        myAdminRequest,
        myAdminRequestLoaded,
        pendingAdminRequests,
        requestAdminAccess,
        reviewAdminRequest,
        admins,
        demoteAdmin,
        transferOwnership, // CHANGED
      }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
}

export function useComplaints() {
  return useContext(ComplaintsContext);
}
