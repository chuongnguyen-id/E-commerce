import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyACuiTSeEfy487-btdDxcOfaP7v7blhtOs",
  authDomain: "e-commerce-3d8f0.firebaseapp.com",
  projectId: "e-commerce-3d8f0",
  storageBucket: "e-commerce-3d8f0.appspot.com",
  messagingSenderId: "428940325477",
  appId: "1:428940325477:web:6f37fb8602371c991fcc8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
