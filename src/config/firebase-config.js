// Import the functions you need from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ1JEr_cLnWWLS_W1yts62Sxofqs4ajEk",
  authDomain: "little-bankers.firebaseapp.com",
  projectId: "little-bankers",
  storageBucket: "little-bankers.appspot.com",
  messagingSenderId: "4798650922",
  appId: "1:4798650922:web:cd8f200d6e57aa61e40153"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); 

// Firebase Auth instance
const auth = getAuth(app);

// Authentication Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export { auth, googleProvider, facebookProvider, firestore,twitterProvider };