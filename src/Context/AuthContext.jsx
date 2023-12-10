import React, { useState, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin status
  const auth = getAuth(); // Initialize Firebase Authentication

  useEffect(() => {
    // Add an observer to handle changes in the user's sign-in state
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);

        // Check if the user has the admin claim
        try {
          const tokenResult = await authUser.getIdTokenResult();
          setIsAdmin(!!tokenResult.claims.admin);
        } catch (error) {
          console.error("Error checking admin claim:", error);
          setIsAdmin(false);
        }
      } else {
        // User is signed out
        setUser(null);
        setIsAdmin(false);
      }
    });

    // Unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
