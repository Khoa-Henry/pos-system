import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClliGbmUz_tIpbuYvLvjADZJ7WRYWomks",
  authDomain: "pos-system-1ebee.firebaseapp.com",
  projectId: "pos-system-1ebee",
  storageBucket: "pos-system-1ebee.firebasestorage.app",
  messagingSenderId: "881079744707",
  appId: "1:881079744707:web:7197028956caa0d203ca76",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
