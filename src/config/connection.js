// Import the functions you need from the SDKs you need
const firebase = require("firebase");
require("firebase/auth");
require("firebase/database");

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.API_AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

if (!firebase.length) {
  firebase.default.initializeApp(firebaseConfig);
}

module.exports = firebase.default;
