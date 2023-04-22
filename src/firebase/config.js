// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB2Hvo8hLrsfl_aeEtsaiZOxrbzTFVgEws",
  authDomain: "miniblog-13432.firebaseapp.com",
  projectId: "miniblog-13432",
  storageBucket: "miniblog-13432.appspot.com",
  messagingSenderId: "342288386335",
  appId: "1:342288386335:web:9f03ff3a22d9f3cc60482a",
  measurementId: "G-CKJ6QV1F6C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth(app);
export {db};