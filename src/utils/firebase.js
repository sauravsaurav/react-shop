// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth  , signInWithPopup , signInWithEmailAndPassword , createUserWithEmailAndPassword} from "firebase/auth";
import {getFirestore, doc , getDoc , setDoc} from "firebase/firestore";


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


// By this we will be able to manipulate the data in the database
export const db = getFirestore();

// The actual method for creating the user document.
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};



// For signing in with email and password
export const signInAuthUserWithEmailAndPassword = async(email , password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth , email , password);
}


// For creating a user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};