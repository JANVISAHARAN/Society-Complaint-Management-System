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
  deleteDoc
} from 'firebase/firestore';

const ComplaintsContext = createContext();

export function ComplaintsProvider({ children }) {
  const [complaints, setComplaints] = useState([]);
  const [userId, setUserId] = useState(null); // null means not logged in
  const [loading, setLoading] = useState(true); // Track auth loading state
  const [complaintsLoading, setComplaintsLoading] = useState(false); // Loading complaints from Firestore

  // Automatically sync userId with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setComplaints([]); // Clear complaints on logout
      }
      setLoading(false); // Auth check complete
    });
    return () => unsubscribe();
  }, []);

  // Real-time listener for complaints for the logged-in user
  useEffect(() => {
    if (!userId) return;
    setComplaintsLoading(true);
    const q = query(
      collection(db, 'complaints'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const complaintsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComplaints(complaintsData);
      setComplaintsLoading(false);
    }, (error) => {
      console.error('Error fetching complaints:', error);
      setComplaints([]);
      setComplaintsLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  // Add a new complaint to Firestore
  const addComplaint = async (complaint) => {
    if (!userId) return;
    const complaintData = {
      ...complaint,
      userId: userId,
      date: Timestamp.now(),
      status: 'Pending',
    };
    try {
      await addDoc(collection(db, 'complaints'), complaintData);
      // No need to update local state, onSnapshot will handle it
    } catch (error) {
      console.error('Error adding complaint:', error);
    }
  };

  // Delete a complaint from Firestore
  const deleteComplaint = async (complaintId) => {
    if (!complaintId) return;
    try {
      await deleteDoc(doc(db, 'complaints', complaintId));
      // No need to update local state, onSnapshot will handle it
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  return (
    <ComplaintsContext.Provider value={{ complaints, addComplaint, deleteComplaint, userId, loading, complaintsLoading }}>
      {children}
    </ComplaintsContext.Provider>
  );
}

export function useComplaints() {
  return useContext(ComplaintsContext);
} 