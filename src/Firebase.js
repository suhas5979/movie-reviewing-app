import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjS3dR1C3Qf-0UlWfiBsmLfka1vly66B0",
  authDomain: "class-scheduler-58909.firebaseapp.com",
  databaseURL: "https://class-scheduler-58909.firebaseio.com",
  projectId: "class-scheduler-58909",
  storageBucket: "class-scheduler-58909.appspot.com",
  messagingSenderId: "73461342685",
  appId: "1:73461342685:web:93bef6b2f5ea9c64db1634",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { app, firestore };
