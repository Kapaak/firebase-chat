// Import the functions you need from the SDKs you need
import { getDatabase } from "@firebase/database";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4TDoJuZBfcwJzBAKbmZTmfinQczDlIg8",
  authDomain: "fir-nextjs-todo.firebaseapp.com",
  databaseURL: "https://fir-nextjs-todo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-nextjs-todo",
  storageBucket: "fir-nextjs-todo.appspot.com",
  messagingSenderId: "372167901298",
  appId: "1:372167901298:web:a987b3e552e24d4a2842eb",
  measurementId: "G-EE7HHDDDGS"
};

// Initialize Firebase
 const firebaseApp = initializeApp(firebaseConfig);
 export const db = getDatabase(firebaseApp);

// const analytics = getAnalytics(app);