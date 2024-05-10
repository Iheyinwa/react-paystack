// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const apikey = import.meta.env.VITE_API_KEY

const firebaseConfig = {
  apiKey: "AIzaSyAlqm8i8JjFwLZi_2XUyyOfOm_ZFWiV4Yg",
  authDomain: "reacthookform-31c10.firebaseapp.com",
  projectId: "reacthookform-31c10",
  storageBucket: "reacthookform-31c10.appspot.com",
  messagingSenderId: "75793420934",
  appId: "1:75793420934:web:d0223dc6ce3c6a05e7f707",
  measurementId: "G-WZ1X4WCM00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
