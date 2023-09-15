import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA3myeQy-RYcdXTIBadHNxqcQRModDZ5Q8",
  authDomain: "fir-auth-fbaef.firebaseapp.com",
  databaseURL: "https://fir-auth-fbaef-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-auth-fbaef",
  storageBucket: "fir-auth-fbaef.appspot.com",
  messagingSenderId: "782846289873",
  appId: "1:782846289873:web:17d29f8aa3051730e5a2f0",
  databaseURL: "https://fir-auth-fbaef-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);
export const storage = getStorage(app);

export default app;