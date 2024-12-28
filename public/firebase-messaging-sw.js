importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyDjkdfTY8qQIRuCam8AmPZE-2hM1Cu6jx0",
  authDomain: "let-z-gear.firebaseapp.com",
  projectId: "let-z-gear",
  storageBucket: "let-z-gear.firebasestorage.app",
  messagingSenderId: "769656323364",
  appId: "1:769656323364:web:0a3fc2b6af78073fb007b1",
  measurementId: "G-46MV4ESWNQ",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload,
  );

  const notificationTitle =
    payload.notification?.title || "Background Notification Title";
  const notificationOptions = {
    body: payload.notification?.body || "Background Notification Body",
    icon: payload.notification?.icon || "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
