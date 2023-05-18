// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {onAuthStateChanged , GoogleAuthProvider, getAuth  , signInWithPopup , signInWithEmailAndPassword , createUserWithEmailAndPassword , signOut} from "firebase/auth";
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


// For signing out the user 
export const signOutUser = async()=> signOut(auth);

// For observing the auth state change 
export const onAuthStateChangeHandler = (callback) => {
  // In below , the callback will run whenever the auth state changes.
  onAuthStateChanged(auth , callback);
}


// For fetching all the directories of the logged in user 
export const getDirectoriesOfUser = async (uid)=>{
  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);
  if(userDoc.exists() && userDoc.data().directories){
    return (userDoc.data());  
  }
  else{
    return {directories : {}};
  }
}


export const updateCodeDetails = async(uid, directories, codedFile)=>{
  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);

  if(userDoc.exists()){
    const userData = userDoc.data();
    userData.directories = directories;
    userData.codedFile = JSON.stringify(codedFile)
    return await setDoc(userDocRef, userData);
  }
}
// {"name":"root","directories":[],"files":[]}