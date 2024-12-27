importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
});
