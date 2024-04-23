// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaZnY5zuOqOLoZfm_hzRg2G1jw1G1c5u4",
  authDomain: "ecommerce-angular-31198.firebaseapp.com",
  databaseURL: "https://ecommerce-angular-31198-default-rtdb.firebaseio.com",
  projectId: "ecommerce-angular-31198",
  storageBucket: "ecommerce-angular-31198.appspot.com",
  messagingSenderId: "218897760069",
  appId: "1:218897760069:web:8effbfda9dfc7bb3ef882c"
};

export const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase);
