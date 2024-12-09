import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXHrT1EAt_j2dMVwRwZyXjDQUZ78r6BJY",
  authDomain: "likeyou-e0a7e.firebaseapp.com",
  projectId: "likeyou-e0a7e",
  storageBucket: "likeyou-e0a7e.firebasestorage.app",
  messagingSenderId: "407565381385",
  appId: "1:407565381385:web:fa4af2b234c43931612dd8"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);