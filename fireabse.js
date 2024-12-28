import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { setToLocalStorage } from "./utils/localStorage";
import { FCM_TOKEN_KEY } from "./utils/constant";

const firebaseConfig = {
  apiKey: "AIzaSyDjkdfTY8qQIRuCam8AmPZE-2hM1Cu6jx0",
  authDomain: "let-z-gear.firebaseapp.com",
  projectId: "let-z-gear",
  storageBucket: "let-z-gear.firebasestorage.app",
  messagingSenderId: "769656323364",
  appId: "1:769656323364:web:0a3fc2b6af78073fb007b1",
  measurementId: "G-46MV4ESWNQ",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      setToLocalStorage(FCM_TOKEN_KEY, token);
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
