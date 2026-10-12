
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDERoX_aM2O_V_eaexrCTDbX0HepbBA1Mw",
  authDomain: "fir-4c866.firebaseapp.com",
  projectId: "fir-4c866",
  storageBucket: "fir-4c866.firebasestorage.app",
  messagingSenderId: "780737755374",
  appId: "1:780737755374:web:52eb8f0ff62868076a1bff",
  measurementId: "G-5VW2ZNDLGY"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  setDoc,
  serverTimestamp,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
};
