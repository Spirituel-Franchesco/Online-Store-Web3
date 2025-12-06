// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAumms84n1513h7O3HN14hZ4x5pf0IzQng",
  authDomain: "online-store-web3.firebaseapp.com",
  projectId: "online-store-web3",
  storageBucket: "online-store-web3.firebasestorage.app",
  messagingSenderId: "24553495712",
  appId: "1:24553495712:web:930d2c30834146fa603dc5"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Service d'authentification
export const auth = getAuth(app);

export default app;

