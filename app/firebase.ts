// firebase.ts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDR-Q6Ul_G5RhZdIGi-TaC92JJXpqQFSho",
  authDomain: "petshopbihlbless.firebaseapp.com",
  projectId: "petshopbihlbless",
  storageBucket: "petshopbihlbless.firebasestorage.app",
  messagingSenderId: "846745385839",
  appId: "1:846745385839:web:83908913e28a95cfaa069a",
  measurementId: "G-TR3FP7HZPL"
};

export const app = initializeApp(firebaseConfig);
