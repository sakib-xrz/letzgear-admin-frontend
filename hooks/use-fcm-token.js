import { useState, useEffect } from "react";
import { messaging } from "../fireabse";
import { getToken } from "firebase/messaging";
import { setToLocalStorage } from "@/utils/localStorage";
import { FCM_TOKEN_KEY } from "@/utils/constant";

export const useFcmToken = () => {
  const [fcmToken, setFcmToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");

          // Register service worker and get the FCM token
          const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js",
          );
          const token = await getToken(messaging, {
            serviceWorkerRegistration: registration,
          });

          if (token) {
            setFcmToken(token);
            console.log("FCM Token:", token);

            // Store the token in local storage
            setToLocalStorage(FCM_TOKEN_KEY, token);
            console.log("FCM token stored in local storage.");
          } else {
            console.error("Failed to get FCM token.");
            setError("Failed to get FCM token.");
          }
        } else {
          console.error("Notification permission denied.");
          setError("Permission denied");
        }
      } catch (err) {
        console.error("Error retrieving FCM token:", err);
        setError(err.message);
      }
    };

    requestPermission();
  }, []);

  return { fcmToken, error };
};
