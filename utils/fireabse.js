import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDjkdfTY8qQIRuCam8AmPZE-2hM1Cu6jx0",
  authDomain: "let-z-gear.firebaseapp.com",
  projectId: "let-z-gear",
  storageBucket: "let-z-gear.firebasestorage.app",
  messagingSenderId: "769656323364",
  appId: "1:769656323364:web:0a3fc2b6af78073fb007b1",
  measurementId: "G-46MV4ESWNQ",
};

const vapidKey =
  "BJuO_sxFZyZm1g740yuHkyw7AXkUqgrflw6a0YtZOKISoHZHAai6Ttc-gW9JOdLawJ8EBeNKkf3tqo4qCYjhsyw";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey });
      console.log("FCM Token: ", token);
      return token;
    } else {
      console.log("Unable to get permission to notify.");
      throw new Error("Unable to get permission to notify.");
    }
  } catch (err) {
    console.error("Error getting FCM token: ", err);
    throw err;
  }
};
