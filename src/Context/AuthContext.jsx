import React, { useState, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Authentication

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const auth = getAuth(); // Initialize Firebase Authentication

  useEffect(() => {
    // Add an observer to handle changes in the user's sign-in state
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
