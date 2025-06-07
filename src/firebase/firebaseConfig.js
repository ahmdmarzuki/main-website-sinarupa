import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAejLnJiJM1a5ed6e_99Qe2sq4OcDa1ySY",
  authDomain: "fsrd-24.firebaseapp.com",
  databaseURL:
    "https://fsrd-24-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fsrd-24",
  storageBucket: "fsrd-24.firebasestorage.app",
  messagingSenderId: "149126515757",
  appId: "1:149126515757:web:7eee9ccbf1acc60d57fca4",
  measurementId: "G-JYKD0DE9FL",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
