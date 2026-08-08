import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  Timestamp,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

const ComplaintsContext = createContext();

export function ComplaintsProvider({ children }) {
  const [complaints, setComplaints] = useState([]);       // this user's own complaints
  const [allComplaints, setAllComplaints] = useState([]);  // ALL complaints — admin only
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);                  // 'resident' | 'admin' | null
  const [loading, setLoading] = useState(true);             // auth loading
  const [complaintsLoading, setComplaintsLoading] = useState(false);

  const isAdmin = role === 'admin';

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setRole(null);
        setComplaints([]);
        setAllComplaints([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // CHANGED: listen to this user's role document
  useEffect(() => {
    if (!userId) return;
    const unsubscribe = onSnapshot(
      doc(db, 'users', userId),
      (snap) => {
        setRole(snap.exists() ? snap.data().role || 'resident' : 'resident');
      },
      (error) => {
        console.error('Error fetching role:', error);
        setRole('resident'); // fail safe: never silently grant admin
      }
    );
    return () => unsubscribe();
  }, [userId]);

  // Real-time listener for THIS user's complaints (used by MyComplaint / FileComplaint)
  useEffect(() => {
    if (!userId) return;
    setComplaintsLoading(true);
    const q = query(
      collection(db, 'complaints'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setComplaints(querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setComplaintsLoading(false);
      },
      (error) => {
        console.error('Error fetching complaints:', error);
        setComplaints([]);
        setComplaintsLoading(false);
      }
    );
    return () => unsubscribe();
  }, [userId]);

  // CHANGED: real-time listener for ALL complaints — only runs for admins,
  // and Firestore Security Rules independently enforce this server-side too.
  useEffect(() => {
    if (!isAdmin) {
      setAllComplaints([]);
      return;
    }
    const q = query(collection(db, 'complaints'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setAllComplaints(querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (error) => {
        console.error('Error fetching all complaints:', error);
        setAllComplaints([]);
      }
    );
    return () => unsubscribe();
  }, [isAdmin]);

  const addComplaint = async (complaint) => {
    if (!userId) return;
    const complaintData = {
      ...complaint,
      userId,
      date: Timestamp.now(),
      status: 'Pending',
    };
    try {
      await addDoc(collection(db, 'complaints'), complaintData);
    } catch (error) {
      console.error('Error adding complaint:', error);
    }
  };

  const deleteComplaint = async (complaintId) => {
    if (!complaintId) return;
    try {
      await deleteDoc(doc(db, 'complaints', complaintId));
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  // CHANGED: admin-only status update. Firestore rules also enforce this
  // server-side — this client check is just for UX, not the real security boundary.
  const updateComplaintStatus = async (complaintId, newStatus) => {
    if (!complaintId || !isAdmin) return;
    try {
      await updateDoc(doc(db, 'complaints', complaintId), { status: newStatus });
    } catch (error) {
      console.error('Error updating complaint status:', error);
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
      }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
}

export function useComplaints() {
  return useContext(ComplaintsContext);
}