import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcbvH0pN5PzzH5geUAJ1CmjZJYkpnSXlo",
  authDomain: "carrental-de780.firebaseapp.com",
  projectId: "carrental-de780",
  storageBucket: "carrental-de780.appspot.com",
  messagingSenderId: "943357577549",
  appId: "1:943357577549:web:c252bb90e6010802724f04"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
