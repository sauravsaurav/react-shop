// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth  , signInWithPopup} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAgM5rmddoF5G7KNm0XAodbJzN4bMRYgTg",
  authDomain: "react-code-editor-21385.firebaseapp.com",
  projectId: "react-code-editor-21385",
  storageBucket: "react-code-editor-21385.appspot.com",
  messagingSenderId: "803310367824",
  appId: "1:803310367824:web:2920835e750672240ccd55",
  measurementId: "G-6HNV5M9K3K"
};

// Initialize Firebase
 initializeApp(firebaseConfig);

// Setting up the popup preconfigurations
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt : "select_account"
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);