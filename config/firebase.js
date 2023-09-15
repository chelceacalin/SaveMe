import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD05uxIkTiMz7BmwMx6JvSgatUv19M9wc0",
  authDomain: "saveme-18749.firebaseapp.com",
  projectId: "saveme-18749",
  storageBucket: "saveme-18749.appspot.com",
  messagingSenderId: "361447842934",
  appId: "1:361447842934:web:0333a4c3d798e2c846eb57",
  databaseURL: "https://fir-auth-fbaef-default-rtdb.europe-west1.firebasedatabase.app",
};


export default app = initializeApp(firebaseConfig);
export const db=getDatabase(app);
export const storage = getStorage(app);