importScripts("https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.3/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyBglB1eqRFoLbjbw1NnINUHuxN9upBM6jA",
    authDomain: "two-hand-sharing.firebaseapp.com",
    databaseURL: "https://two-hand-sharing-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "two-hand-sharing",
    storageBucket: "two-hand-sharing.appspot.com",
    messagingSenderId: "897208395495",
    appId: "1:897208395495:web:69ee3a68a4aaa7cd4ca442",
    measurementId: "G-XBM3940B1X",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    // Customize notification here
    const notificationTitle = "2hand-sharing";
    const notificationOptions = {
        body: "Tin nhắn mới",
        icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
