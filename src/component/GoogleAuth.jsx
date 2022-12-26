import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../firebase.config.js";
import { serverTimestamp, setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
  const navigate = useNavigate();
  const signUpWithGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const googleSignupResult = await signInWithPopup(auth, provider);
      const user = googleSignupResult.user;
      // Check user is already in firebase database or not
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  navigate("/sign-in");
  return (
    <button
      type="button"
      onClick={signUpWithGoogle}
      className="flex items-center justify-center w-full bg-teal-600 px-6 py-2 mt-6 font-medium text-sm uppercase rounded shadow-md hover:bg-teal-700 transition duration-200 ease-in-out"
    >
      <FcGoogle className="mr-4 text-2xl bg-slate-200 rounded-full" />
      Continue with Google
    </button>
  );
}
