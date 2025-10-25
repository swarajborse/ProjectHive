"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/app/firebase/config.js";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext({ uid: null, name: null, email: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ uid: null, name: null, email: null });

  useEffect(() => {
    // called it unsubscribe so it can be called later to unmount
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
        });
      } else {
        setUser({ name: null, email: null,uid: null });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
