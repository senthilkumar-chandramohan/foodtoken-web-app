// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsc31kqo3OnNjGkpye6fE9NoULlqUCg34",
  authDomain: "foodtoken-firebase-project.firebaseapp.com",
  projectId: "foodtoken-firebase-project",
  storageBucket: "foodtoken-firebase-project.appspot.com",
  messagingSenderId: "302972232022",
  appId: "1:302972232022:web:bd388f6e5bde7aba73b6f7",
  measurementId: "G-MYQ9YS9LT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  app,
  auth,
};
