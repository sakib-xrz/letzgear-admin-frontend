import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDjkdfTY8qQIRuCam8AmPZE-2hM1Cu6jx0",
  authDomain: "let-z-gear.firebaseapp.com",
  projectId: "let-z-gear",
  storageBucket: "let-z-gear.firebasestorage.app",
  messagingSenderId: "769656323364",
  appId: "1:769656323364:web:0a3fc2b6af78073fb007b1",
  measurementId: "G-46MV4ESWNQ",
  databaseURL:
    "https://let-z-gear-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Get Firebase Realtime Database instance
const database = getDatabase(app);

export { database };
