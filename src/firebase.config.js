// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxPdK5BFKC86PMkCAWDTCuA7WimROr71c",
  authDomain: "findhome-react.firebaseapp.com",
  projectId: "findhome-react",
  storageBucket: "findhome-react.appspot.com",
  messagingSenderId: "136620441616",
  appId: "1:136620441616:web:2fb7869a47a19e78ad4a95",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
