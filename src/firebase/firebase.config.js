// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhv2SxOvyI3JKUBjEE9sYn1Rf_ZEJP1ao",
  authDomain: "abrar-firebase-e4c8e.firebaseapp.com",
  projectId: "abrar-firebase-e4c8e",
  storageBucket: "abrar-firebase-e4c8e.appspot.com",
  messagingSenderId: "291309112",
  appId: "1:291309112:web:f05102d200d16d22a188cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// console.log(auth);
export default auth;