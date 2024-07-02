// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDcoHnXGjYwk_MEOTQ5KbDuqKkkW3oCbvU",
//   authDomain: "products4u-9c61f.firebaseapp.com",
//   projectId: "products4u-9c61f",
//   storageBucket: "products4u-9c61f.appspot.com",
//   messagingSenderId: "341056654866",
//   appId: "1:341056654866:web:e063bf97712291366d12cb"
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);

