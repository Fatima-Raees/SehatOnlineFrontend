import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD5Pes-hQK09Hr_vSICGUyr3LqbUi315O8",
    authDomain: "sehatonline-dabed.firebaseapp.com",
    projectId: "sehatonline-dabed",
    storageBucket: "sehatonline-dabed.firebasestorage.app",
    messagingSenderId: "864179909860",
    appId: "1:864179909860:web:c2fd25716fb9ebed03e8f1",
    measurementId: "G-R9C1L1GE6V"
  };

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export for use in other files
export { auth, googleProvider, RecaptchaVerifier };