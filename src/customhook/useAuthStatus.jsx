import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setLoading(false);
    });
  }, []);
  return { loggedIn, loading };
}
