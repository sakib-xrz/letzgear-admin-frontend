"use client";

import { database } from "@/utils/firebase-config";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export default function Dashboard() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Reference to the "notifications" node in Firebase Realtime Database
    const notificationsRef = ref(database, "notifications");

    // Listen for new notifications being added
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notificationsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setNotifications(notificationsArray);
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  console.log(notifications);

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold text-primary xl:text-3xl">
        Dashboard Coming Soon...
      </h1>
      <div>
        <h2 className="my-6 text-center text-xl">Notifications</h2>
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <div key={index} className="my-2 border bg-gray-300 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <p className="text-sm text-gray-600">
                  {dayjs(notification.created_at).format("lll")}
                </p>
              </div>
              <p>{notification.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
