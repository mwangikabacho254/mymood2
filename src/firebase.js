import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrOhhppMmZKK7e8ycvQzf9Te9RN3y7UhY",
  authDomain: "mymood-41ef4.firebaseapp.com",
  projectId: "mymood-41ef4",
  storageBucket: "mymood-41ef4.firebasestorage.app",
  messagingSenderId: "380636763368",
  appId: "1:380636763368:web:3265c3341799485990e55d",
  measurementId: "G-MS5TR7XY67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };